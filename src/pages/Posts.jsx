import React from 'react';

const Posts = () => {
  return (
    <div className='posts-wrapper'>
        <div className="posts-container">
            <div className="tiktok-posts-link"><a href="/tiktok">TikTok</a></div>
            <div className="ig-posts-link"><a href="/ig">IG</a></div>
            <div className="pinterest-posts-link"><a href="/pinterest">Pinterest</a></div>
        </div>
    </div>
  )
}

export default Posts;