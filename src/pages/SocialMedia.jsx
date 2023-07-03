import React from 'react';

// components
import GenericSocialMedia from '../components/GenericSocialMedia';

const SocialMedia = (props) => {
  return (
    <div className='social-media-wrapper'>
      <GenericSocialMedia social_media_name={props.social} />
    </div>
  )
}

export default SocialMedia;