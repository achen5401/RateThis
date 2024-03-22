import React, { useState, useEffect } from 'react';
import api from '../apis/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../redux/actions/modalActions';
import { login } from '../redux/actions/authActions';
import { jwtDecode } from "jwt-decode";

const LoginSignupModal = () => {
  const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal')) {
        dispatch(toggleLoginModal());
      }
    };
  
    // Check if Google's Sign-In client library is loaded
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: "376374490501-3d2hbj4ilchjk42a19s88n829fsefp8r.apps.googleusercontent.com",
        callback: handleGoogleResponse
      });
  
      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in"),
        { type: "standard", theme: "outline", size: "large", shape: "rectangular", width: "450", logo_alignment: "left" }
      );
    } else {
      console.error("Google Sign-In client library not loaded");
    }
  
    if (isLoginModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginModalOpen, dispatch]);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleToggleModal = () => {
    dispatch(toggleLoginModal());
  };

  const handleGoogleResponse = async (response) => {
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    let firstName = userObject.given_name;
    let lastName = userObject.family_name;
    let email = userObject.email;
    const test = await api.googleSignIn(firstName, lastName, email);
    console.log("res", test);
    dispatch(login(test.data.user.firstName, test.data.user.email));
    handleToggleModal();
  };

  const handleLoginSignUp = async () => {
    // Implement login logic using the provided email and password
    if (isLogin) {
      try {
        const response = await api.login(email, password);
        // Handle successful login
        if (response) {
          console.log(response);
        }
        console.log(response.data); // Handle response data
        dispatch(login(response.data.user.firstName, response.data.user.email));
        handleToggleModal();
      } catch (error) {
        // Handle login failure
        console.error('Login error:', error);
      }
    }
    else {
      try {
        const response = await api.register(firstName, lastName, email, password);
        // Handle successful registration
        console.log(response.data); // Handle response data
        setIsLogin(!isLogin);
        dispatch(login(response.data.user.firstName, response.data.user.email));
        handleToggleModal();
      } catch (error) {
        // Handle registration failure
        console.error('Registration error:', error);
      }
    }
  };

  return (
    isLoginModalOpen && (
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={handleToggleModal}>
            X
          </button>
        </div>
        <div className="modal-content">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <div id="google-sign-in" className="google-sign-in-container"></div>
          <div style={{ paddingTop: '20px' }}></div>
          {isLogin ? (
            <>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {/* <div>
                <span>Forgot password?</span>
              </div> */}
            </>
          ) : (
            <><input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </>
          )}
          <button className="loginButton" onClick={handleLoginSignUp}>{isLogin ? 'Login' : 'Sign Up'}</button>
          <div>
            {isLogin ? 'New? ' : 'Already have an account? '}
            <span onClick={handleToggleMode}>
              {isLogin ? 'Sign up' : 'Login'}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginSignupModal;