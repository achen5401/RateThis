import React, { useState, useEffect } from 'react';
import api from '../apis/auth-api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../redux/actions/modalActions';
import { login } from '../redux/actions/authActions';

const LoginSignupModal = () => {
  const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal')) {
        dispatch(toggleLoginModal());
      }
    };

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

  const handleContinueWithGoogle = () => {
    // Handle continue with Google action
  };

  const handleLoginSignUp = async () => {
    // Implement login logic using the provided username and password
    if (isLogin) {
      try {
        const response = await api.login(username, password);
        // Handle successful login
        if (response) {
          console.log(response);
        }
        console.log(response.data); // Handle response data
        dispatch(login(response.data.user.username));
        handleToggleModal();
      } catch (error) {
        // Handle login failure
        console.error('Login error:', error);
      }
    }
    else {
      try {
        const response = await api.register(email, username, password);
        // Handle successful registration
        console.log(response.data); // Handle response data
        dispatch(login(response.data.user.username));
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
          <button className="google-button" onClick={handleContinueWithGoogle}>
            Continue with Google
          </button>
          {isLogin ? (
            <>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div>
                <span>Forgot username or password?</span>
              </div>
            </>
          ) : (
            <>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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