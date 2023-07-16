import React, { useState, useEffect } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { showLoginPopup, hideLoginPopup } from '../redux/loginPopupSlice';

const Login = () => {

  const [ userExists, setUserExists ] = useState(false); //to show either login or create user
  const [ userHasBeenCreated, setUserHasBeenCreated ] = useState(false);
  const [ formErrors, setFormErrors ] = useState({});
  const [ isFormValid, setFormValid ] = useState(false);

  const navigate = useNavigate();

  // Create user
  const [ userInfo, setUserInfo ] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    status: 'user'
  });
  // Login user

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

  // const handleGoogleLogin = () => {
  //   // Handle Google login here
  //   // Call the node.js server route for logging in a user
  // }

  const handleIsLogging = () => {
    setUserExists(true);
  }

  const handleFormSubmitCreate = (event) => {
    event.preventDefault();
    console.log('Creating new user with:', userInfo);
    fetch('http://localhost:3500/users/new', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInfo),
    })
    .then(response => response.json()) // If the server returns JSON, parse it
    .then(data => {
        console.log('Success:', data); // Handle the success case
        setUserHasBeenCreated(true); // Only set to true if the fetch call succeeded
    })
    .catch((error) => {
        console.error('Error:', error); // Handle the error case
    });
  }

  // handle login
  const handleFormSubmitLogin = (event) => {

    event.preventDefault();
    
    // Update user object
    const { email, password } = userInfo;
    const userCredentials = { email, password };

    console.log('Loggin in user with:', userCredentials);

    fetch('http://localhost:3500/users/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userCredentials),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // const { message, userLogged } = data;
      setUserHasBeenCreated(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

// Validation
useEffect(() => {
  const errors = {};
  
  if (!userInfo.email.trim()) {
    errors.email = 'Email is required';
  }
  
  if (!userInfo.password.trim()) {
    errors.password = 'Password is required';
  }

  setFormErrors(errors);

  // If the errors object is empty, the form is valid
  setFormValid(Object.keys(errors).length === 0);
}, [userInfo]);

    // After creating a user, the component will re-render. On the next render, if the user is created,
    // we'll redirect to the new page
    if (userHasBeenCreated) {
        navigate("/admin");
        handleHideLogin();
    }

  return (
    <div className="overlay">
      <div className="login-box">

        { userExists ? <h1 className="title">Login</h1> : <h1 className="title">Create User</h1>}
        

        {userExists ? 
        <div className="login-content">
          {/* <GoogleLoginButton disabled onClick={handleGoogleLogin} /> */}
              <form className='create-user-form' onSubmit={handleFormSubmitLogin}>
                  <label>
                      Email:
                      <input type="email" name="email" value={userInfo.email} onChange={handleFieldChange}/>
                  </label>  
                  <label>
                      Password:
                      <input type="password" name="password" value={userInfo.password} onChange={handleFieldChange}/>
                  </label>  

                  <button type="submit">Log In</button>
              </form> 
        </div>
      
        : <form className='create-user-form' onSubmit={handleFormSubmitCreate}>
            <label>
                Email:
                <input type="email" name="email" value={userInfo.email} onChange={handleFieldChange}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" value={userInfo.password} onChange={handleFieldChange}/>
            </label>  
            <label>
                Username:
                <input type="text" name="username" value={userInfo.username} onChange={handleFieldChange}/>
            </label>  
            <label>
                Name:
                <input type="text" name="name" value={userInfo.name} onChange={handleFieldChange}/>
            </label>  

            <button type="submit" disabled={!isFormValid}>Create User</button>
        </form>}

       
        {/* <button className='close-login-overlay' onClick={handleHideLogin}>Cancel</button> */}

        { userExists ? null : <button className='user-login-overlay' onClick={handleIsLogging}>I already have a user</button>} 
        <button className='close-login-overlay' onClick={handleHideLogin}>Cancel</button>

      </div>

    </div>
  );
}

export default Login;