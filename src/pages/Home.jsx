import React from "react";

//import database
import { media_list } from "../data/media_list";

const Home = () => {
  return (
    <div className="home-wrapper">

      <div className="app-name">
        <h1>Laifisy</h1>
      </div>

      <div className="hero">
        <h1>Social Media Organizer</h1>
        <h4>Your Social Media Management Assistant</h4>
        <div className="hero-content">
          <p>Organize and share all your content planning</p>
          <p>Create the best content with the help of AI</p>
          <p>Make your life easier!</p>
        </div>
      </div>


      {/* List of social medias */}
      <div className="social-medias-list-wrapper">
        <h3>List of social networks</h3>
        {media_list.map((item, key) => {
          return (
            <ul key={key}>
              <li> {key + 1}. <a href={item.link}> {item.name} </a></li>
            </ul>
          );})}
      </div>
    </div>
  );
};

export default Home;
