import React, { useState } from "react";

const GenericOrgPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tiktok_org_post_wrapper">

      <div className="tiktok-title">
          <h3>Title: {props.title}</h3>
          
          {isOpen ? (
            <button className="button-1" onClick={() => setIsOpen(!isOpen)}>Close</button>
            ) : 
            <button className="button-1" onClick={() => setIsOpen(!isOpen)}>View</button>}
          
      </div>

      {isOpen ? (
        <div className="overlay">
          <div className="post-content">
            <p> <b>Audio name:</b> {props.audio}</p>
            <p> <b>Description:</b>  {props.description}</p>
            <button className="button-2" onClick={() => setIsOpen(!isOpen)}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GenericOrgPost;
