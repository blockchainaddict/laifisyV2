import React, { useEffect, useState } from 'react';

// import children components
import GenericOrgPost from './GenericOrgPost';

//import database
// import { tiktok } from "../data/tiktok";


const GenericSocialMedia = (props) => {

  const [data, setData] = useState(null);

  // Filters
  const [dateFilter, setDateFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [textFilter, setTextFilter] = useState('');


  // Convert select options to actual date filters
  function convertDates(filter) {
    const today = new Date();
    let startDate, endDate;
  
    switch(filter) {
      case 'today':
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        break;
      case 'this_week':
        const firstDayOfWeek = today.getDate() - today.getDay();
        startDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek);
        endDate = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + 7);
        break;
      case 'this_month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        startDate = null;
        endDate = null;
    }
  
    return { startDate, endDate };
  }
  


    useEffect(() => {
        // Dynamic import
        import(`../data/${props.social_media_name}`)
            .then((dataModule) => {
                setData(dataModule.default);
            })
            .catch((error) => {
                // Handle the error appropriately for your app
                console.error(`An error occurred while loading data for ${props.social_media_name}:`, error);
            });
    }, [props.social_media_name]); // Re-run this effect when the socialMediaName prop changes

    // Filters
    const handleDateFilterChange = (event) => {
      setDateFilter(event.target.value);
    };
    
    const handleTypeFilterChange = (event) => {
      setTypeFilter(event.target.value);
    };
    const handleTextFilterChange = (event) => {
      setTextFilter(event.target.value);
    };
    
    

  return (
    <div className='gsm-wrapper'>
      
        <h1>{props.social_media_name}</h1>

        {/* filters */}
        <div className="filters">
            <h3>Filters</h3>
            <div className="filters-wrapper">
              <div className='filter-container'>
                <label><b>Date:</b> </label>
                <select onChange={handleDateFilterChange}>
                  <option value="">All</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>
              <div className='filter-container'>
                <label> <b>Type:</b> </label>
                <select onChange={handleTypeFilterChange}>
                  <option value="">All</option>
                  <option value="post">Post</option>
                  <option value="story">Story</option>
                </select>
              </div>
              <div className='filter-container'>
                <label><b>Words:</b></label>
                <input type="text" onChange={handleTextFilterChange} placeholder='Type any word'/>
              </div>
            </div>
          </div>


        <section>
            
            <h2>{props.social_media_name} Content</h2>

            {data ? data
                .filter(item => {
                  if (dateFilter) {
                    const { startDate, endDate } = convertDates(dateFilter);
                    const itemDate = new Date(item.date.split('/').reverse().join('-'));
                    return itemDate >= startDate && itemDate < endDate;
                  }
                  // If no date filter is selected, return all posts
                  return true;
                })
                .filter(item => {
                  if (typeFilter) {
                    return item.format === typeFilter;
                  }
                  // If no type filter is selected, return all posts
                  return true;
                })
                .filter(item => {
                  if (textFilter) {
                    return item.description.toLowerCase().includes(textFilter.toLowerCase());
                  }
                  return true;
                })
                .map((item, index) => {
                  let description = item.description;
                  if (textFilter) {
                    const parts = item.description.split(new RegExp(`(${textFilter})`, 'gi'));
                    description = parts.map((part, i) => (
                      part.toLowerCase() === textFilter.toLowerCase() ?
                        <strong style={{color:'blue'}} key={i}>{part}</strong> :
                        part
                    ));
                  }
                  return <GenericOrgPost title={item.title} audio={item.audio} description={description} key={index}/>;
                })
              : 'Loading'}

            

        </section>

    </div>
  )
}

export default GenericSocialMedia;
