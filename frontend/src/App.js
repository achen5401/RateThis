import React from 'react';
import './App.css'; // Create this file in the same directory with your styles
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import LoginSignupModal from './components/LoginSignupModal';
import NewCardScreen from './components/NewCardScreen';
import MyCardsScreen from './components/MyCardsScreen';

function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<HomeScreen/>}/>
        <Route path = "/new-card" element = {<NewCardScreen/>}/>
        <Route path = "/my-cards" element = {<MyCardsScreen/>}/>
      </Routes>
      <LoginSignupModal/>
    </BrowserRouter>
  );
}

export default App;