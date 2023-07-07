import React, { useState } from "react";

const GenericOrgPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tiktok-org-post-wrapper">
      
      {/* OVERLAY */}
        {isOpen ? (
                <div className="overlay">
                  <div className="post-content">
                    <div className="post-text">

                      <p> <b>Title:</b> {props.title}</p>
                      <p> <b>Caption:</b> {props.caption}</p>
                      {props.description ? <p> <b>Description:</b> {props.description}</p> : null}
                      <p> <b>Type:</b> {props.type}</p>
                      {props.postDate ?<p> <b>Post Date:</b> {props.postDate}</p> : null}
                      {props.brand ? <p> <b>Brand:</b> {props.brand}</p> : null}
                      {props.audio ? <p> <b>Audio:</b> {props.audio}</p> : null}
                      {props.likes && props.likes.length > 0 ? <p> <b>Likes:</b> {props.likes}</p> : null}
                  
                    </div>

                    <div className="post-overlay-buttons">
                      {props.mediaURL ? <button className="button-2 view-link"> <a href={props.mediaURL} target="_blank" rel="noreferrer">Go To Post</a></button> : <div></div> }
                      <button className="button-2 view-link"> <a href={`content/edit/${props.id}`}>Edit</a></button>
                      <button className="button-2 close-overlay" onClick={() => setIsOpen(!isOpen)}>Close</button>
                    </div>
                  </div>
                </div>
              ) : null}

       {isOpen ? (
            null
            ) : 
            <button className="button-0" onClick={() => setIsOpen(!isOpen)}></button>}
      
      <div className="tiktok-title">
          <h3>Title: {props.title}</h3>
      </div>

      
    </div>
  );
};

export default GenericOrgPost;