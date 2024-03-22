import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLoginModal } from '../redux/actions/modalActions';
import { logout } from '../redux/actions/authActions';
import api from '../apis/auth-api';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstName = useSelector((state) => state.auth.firstName);

  function openLoginSignupModal() {
    dispatch(toggleLoginModal());
  }

  async function handleLogout() {
    const response = await api.logout();
    dispatch(logout());
    navigate("/");
  }

  function handleHome() {
    navigate("/");
  }

  function handleNewCard() {
    navigate("/new-card");
  }

  function handleViewCards() {
    navigate("/my-cards")
  }

  return (
    <div className="navbar">
      <div className="logo">
        {/* Your logo image or text goes here */}
        <img src="logo.png" alt="Logo" onClick={handleHome}/>
      </div>
      <div className="login">
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="dropbtn">Hi {firstName} &#9660;</button>
            <div className="dropdown-content">
              <a onClick={handleNewCard}>New Card</a>
              <a onClick={handleViewCards}>My Cards</a>
              <a onClick={handleLogout}>Logout</a>
            </div>
          </div>
        ) : (
          <button onClick={openLoginSignupModal}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;