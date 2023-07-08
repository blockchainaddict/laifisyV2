import React from 'react';

// To create avatars
import Avatar from 'react-avatar';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src="/img/logo.png" alt="Logo" />
        </a>
        <p style={{fontSize:'0.8em'}}>Laifisy</p>
      </div>

      <nav className="navigation">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/create">Create</a></li>

          <li><a href="/posts">Posts</a></li>
          <li><a href="/analytics">Analytics</a></li>
        </ul>
      </nav>

      <div className="user-profile">
        {/* <img src="/path-to-user-profile-pic.png" alt="User" /> */}
        <Avatar className='avatar' name="S V B" round={true} size='50'/>
        <div className="user-details">
          <p className="username">Santiago</p>
          <a href="/logout">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;