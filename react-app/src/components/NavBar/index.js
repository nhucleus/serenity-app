import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from "../../store/auth";
import Lavender from "./lavender.png";
import AudioPlayer from "../Audio";
import "./NavBar.css";


const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const email = "demo@aa.io";
  const password = "password";

  const handleDemoClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email, password }))
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <AudioPlayer />
    );
  } else {
    sessionLinks = (
      <>
        <button className="nav-bar-button" onClick={handleDemoClick}>Demo Login</button>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="nav-bar__container">
      <ul className="nav-bar">
        <li className="logo-container">
          <NavLink exact to={sessionUser ? '/dashboard' : '/'} id="title">
            <h1 className="title-text">Serenity</h1>
            <img className="lavender-img" src={Lavender} />
          </NavLink>
        </li>
        
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
};

export default NavBar;