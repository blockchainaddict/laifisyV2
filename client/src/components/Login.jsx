import React, { useState } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { dateNow } from '../utilities/timeFunctions';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { showLoginPopup, hideLoginPopup } from '../redux/loginPopupSlice';

const Login = () => {

  const [ userInfo, setUserInfo ] = useState({
    name: '',
    username: '',
    password: '',
    status: '',
    timestamp: ''
  });

  const handleFieldChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  };

  const loginPopupState = useSelector(state => state.loginPopup);
  const dispatch = useDispatch();

  const handleHideLogin = () => {
    dispatch(hideLoginPopup());
  }

  const handleGoogleLogin = () => {
    // Handle Google login here
    // Call the node.js server route for logging in a user
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setUserInfo({
      ...userInfo,
      timestamp: dateNow()
    })
    console.log('Creating new content with:', userInfo);
    fetch('http://localhost:3500/create/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInfo),
      })
      .then(response => response.json()) // If the server returns JSON, parse it
      .then(data => console.log('Success:', data)) // Handle the success case
      .catch((error) => {
        console.error('Error:', error); // Handle the error case
      });
  }

  return (
    <div className="overlay">
      <div className="login-box">
        <h1 className="title">Login</h1>
        <GoogleLoginButton disabled onClick={handleGoogleLogin} />

        <form onSubmit={handleFormSubmit}>
            <label>
                Email:
                <input type="email" name="email" value={userInfo.email} onChange={handleFieldChange}/>
            </label>  
        </form>
        <button className='close-login-overlay' onClick={handleHideLogin}>Cancel</button>

      </div>

    </div>
  );
}

export default Login;