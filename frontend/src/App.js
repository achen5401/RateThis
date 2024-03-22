import React from 'react';
import './App.css'; // Create this file in the same directory with your styles
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Navbar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import LoginSignupModal from './components/LoginSignupModal';
import NewCardScreen from './components/NewCardScreen';
import MyCardsScreen from './components/MyCardsScreen';
import EditCardScreen from './components/EditCardScreen';
import api from './apis/auth-api';
import { useEffect } from 'react';
import { login } from './redux/actions/authActions';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        // Check if the user is logged in based on the presence of a cookie
        // If there's a valid cookie, update Redux state accordingly
        const checkLoginStatus = async () => {
            try {
                const response = await api.isLoggedIn();
                console.log("logging in ", response);
                if (response.data.loggedIn) {
                    dispatch(login(response.data.user.firstName, response.data.user.email));
                }
                else {
                  console.log("testtt");
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<HomeScreen/>}/>
        <Route path = "/new-card" element = {<NewCardScreen/>}/>
        <Route path = "/my-cards" element = {<MyCardsScreen/>}/>
        <Route path = "/edit-card" element = {<EditCardScreen/>}/>
      </Routes>
      <LoginSignupModal/>
    </BrowserRouter>
  );
}

export default App;