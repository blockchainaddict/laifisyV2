import React, { useState } from "react";

const GenericOrgPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tiktok_org_post_wrapper">
       {isOpen ? (
            null
            ) : 
            <button className="button-0" onClick={() => setIsOpen(!isOpen)}></button>}
      
      <div className="tiktok-title">
          <h3>Title: {props.title}</h3>
      </div>

      {isOpen ? (
        <div className="overlay">
          <div className="post-content">
            <div className="post-text">
              <p> <b>Title:</b> {props.title}</p>
              <p> <b>Caption:</b> {props.caption}</p>
              <p> <b>Description:</b> {props.description}</p>
              <p> <b>Type:</b> {props.type}</p>
              <p> <b>Post Date:</b> {props.postDate}</p>
              <p> <b>Brand:</b> {props.brand}</p>
              <p> <b>Audio:</b> {props.audio}</p>

                {props.likes && props.likes.length > 0 ? <p> <b>Likes:</b> {props.likes}</p> : null}
            </div>
            

            <div className="post-overlay-buttons">
              {props.mediaURL ? <button className="button-2 view-link"> <a href={props.mediaURL} target="_blank" rel="noreferrer">Go To Post</a></button> : <div></div> }
              <button className="button-2 close-overlay" onClick={() => setIsOpen(!isOpen)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GenericOrgPost;