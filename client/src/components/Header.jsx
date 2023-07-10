import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { showLoginPopup, hideLoginPopup } from '../redux/loginPopupSlice';

// import mdoules
import Login from './Login';

// To create avatars
import Avatar from 'react-avatar';

const Header = () => {
  const loginPopupState = useSelector(state => state.loginPopup);
  const dispatch = useDispatch();

  // useState for showing a login overlay   
  // const [ showLogin, setShowLogin ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const handleShowLogin = () => {
    dispatch(showLoginPopup());
  }

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
          
          {isLoggedIn ? 
          <a href="/logout">Logout</a>
          :
          <button onClick={handleShowLogin} >Login</button>
          }

        </div>
      </div>

      {loginPopupState.value ? <Login/> : null}

    </header>
  );
};

export default Header;