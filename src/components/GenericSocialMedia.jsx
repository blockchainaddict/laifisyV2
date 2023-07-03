import React, { useEffect, useState } from 'react';

// import children components
import GenericOrgPost from './GenericOrgPost';

//import database
// import { tiktok } from "../data/tiktok";


const GenericSocialMedia = (props) => {

  const [data, setData] = useState(null);

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


  return (
    <div className='gsm-wrapper'>
      
        <h1>{props.social_media_name}</h1>

        <section>
            
            <h2>{props.social_media_name} Content</h2>

            {data ? data.map((item, index) => {
              return <GenericOrgPost title={item.title} audio={item.audio} script={item.script} key={index}/>;
            })
            : 'Loading'}
            

        </section>

    </div>
  )
}

export default GenericSocialMedia;
