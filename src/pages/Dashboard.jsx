import React, { useState } from 'react';

// import children components
import GenericOrgPost from '../components/GenericOrgPost';

// import all social dbs
import TikTok from "../data/TikTok";
import IG from "../data/IG";
import Pinterest from "../data/Pinterest";

const allPosts = [...TikTok, ...IG, ...Pinterest];
console.log('H E R E 0- - - - -', allPosts);

const Dashboard = () => {

    // Filters
    const [socialFilter, setSocialFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);
    const [typeFilter, setTypeFilter] = useState(null);
    const [textFilter, setTextFilter] = useState('');

    // Filters
    const handleSocialFilterChange = (event) => {
        setSocialFilter(event.target.value);
        console.log('S O C I A L F I L T E R' + socialFilter);
      };
    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
      };
      
    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
      };
    const handleTextFilterChange = (event) => {
        setTextFilter(event.target.value);
      };

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


  return (
    <div className='dashboard-wrapper'>

        {/* filters */}
        <aside className="filters">
            <h3>Filters</h3>
            <div className="filters-wrapper">
                <div className='filter-container'>
                  <label><b>Platform:</b> </label>
                  <select onChange={handleSocialFilterChange}>
                    <option value="">All</option>
                    <option value="TikTok">TikTok</option>
                    <option value="IG">IG</option>
                    <option value="Pinterest">Pinterest</option>
                  </select>
                </div>
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
          </aside>

          <section>
            <h2 style={{textAlign:'center', margin:'40px 0'}}>Dashboard</h2>

            <h2> Content </h2>
            <div className='dashboard-posts-section'>
            
            {
              allPosts
                ? allPosts
                    .filter(item => {
                      if (socialFilter) {
                        return item.platform === socialFilter;
                      }
                      return true;
                    })
                    .filter(item => {
                      if (dateFilter) {
                        const { startDate, endDate } = convertDates(dateFilter);
                        const itemDate = new Date(item.postDate.split('/').reverse().join('-'));
                        return itemDate >= startDate && itemDate < endDate;
                      }
                      return true;
                    })
                    .filter(item => {
                      if (typeFilter) {
                        return item.format === typeFilter;
                      }
                      return true;
                    })
                    .filter(item => {
                      if (textFilter) {
                        return item.script && item.script.some(scene => scene.sceneDescription.toLowerCase().includes(textFilter.toLowerCase()));
                      }
                      return true;
                    })
                    .map((item, index) => {
                      let script = item.script ? item.script.map((scene) => ({
                        ...scene,
                        sceneDescription: scene.sceneDescription.split(new RegExp(`(${textFilter})`, 'gi')).map((part, i) => (
                          part.toLowerCase() === textFilter.toLowerCase()
                            ? <strong style={{color:'blue'}} key={i}>{part}</strong>
                            : part
                        ))
                      })) : [];
                      return <GenericOrgPost title={item.title} audio={item.audio} script={script} link={item.mediaURL} key={index} />;
                    })
                : allPosts.map((item, index)=>{
                    let script = item.script ? item.script : [];
                    return <GenericOrgPost title={item.title} audio={item.audio} script={script} link={item.mediaURL} key={index} />
                  })
            }
            
            
                    </div>
          </section>
    </div>
  )
}

export default Dashboard;
