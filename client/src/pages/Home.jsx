import React, { useState } from "react";

//import database
import { media_list } from "../data/media_list";

const Home = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="home-wrapper">

      <div className="app-name">
        <h1>
          Laif<span>isy</span>
        </h1>
      </div>

      <div className="hero">

        <h1>Social Media Organizer</h1>
        <h4>Your Social Media Management Assistant</h4>

        <img className="home-img" src="/img/home-flow.png" alt="" />

        <div className="hero-content">

          <div className="hero1">
            <p>✓ Organize and share all your content planning</p>
            <img src="/img/1.hero.jpg" alt="heroimg" />
          </div>


          <div className="hero2">
            <p>✓ Create the best content with the help of AI</p>
            <img src="/img/2.hero.jpg" alt="heroimg" />
          </div>

          <div className="hero3">
            <p>✓ Make your life Easy!</p>
            <img src="/img/3.hero.jpg" alt="heroimg" />

          </div>
        </div>

      </div>

      <h3 className="info-wrapper-h3">What can you do with our App?</h3>

      <div className="info-wrapper">
        <ul>
          <li>
            ➜ <b>Create</b> your content for all social networks with ease, all
            in the same place
          </li>
          <li>
            ➜ <b>Organize</b> your created content to keep track of all your
            work
          </li>
          <li>
            ➜ Get the <b>help of AI</b> to create content if you're on a rush or
            having writer's block
          </li>
          <li className="li-with-popup">
            ➜ <b>Share</b> your work to your clients/co-workers or anyone, in
            <span
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="simple-steps"
            >
              {" "}
              <u>3 simple steps</u>
            </span>
            {isHovering && (
              <div className="home-popup">
                <p>1. Create content</p>
                <p>
                  2. Choose a method (Create <i>Share link</i> or{" "}
                  <i>Download PDF)</i>
                </p>
                <p>3. Share via Email, Whatsapp or directly on our Platform</p>
              </div>
            )}
          </li>
          <li>
            ➜ Get <b>Insights</b> through our Analytics system, knowing what
            you've created and posted so far
          </li>
          <li>
            ➜ Make your life <b>easy</b>!
          </li>
        </ul>
      </div>

      {/* List of social medias */}
      <div className="social-medias-list-wrapper">
        <h3>List of social networks</h3>
        {media_list.map((item, key) => {
          return (
            <ul key={key}>
              <li>
                {" "}
                {key + 1}. <a href={item.link}> {item.name} </a>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
