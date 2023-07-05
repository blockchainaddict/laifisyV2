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
              <p> <b>Audio:</b> {props.audio}</p>

              {props.script && props.script.length > 0 ? <p><b><u>Scenes</u></b></p> : null}
              
              {props.script && props.script.map((scene, index) => (
                <div key={index}>
                  <strong>Scene {scene.sceneNumber}:</strong> {scene.sceneDescription}
                </div>))}
            </div>
            

            <div className="post-overlay-buttons">
              {props.link ? <button className="button-2 view-link"> <a href={props.link} target="_blank" rel="noreferrer">Go To Post</a></button> : <div></div> }
              <button className="button-2 close-overlay" onClick={() => setIsOpen(!isOpen)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GenericOrgPost;