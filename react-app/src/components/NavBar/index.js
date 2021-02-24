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
      <div className="nav-bar-right">
        <AudioPlayer />
        <div className="nav-bar-avatar-container">
          <img draggable="false" className="nav-bar-avatar" src={sessionUser.avatar} />
          <img draggable="false" className="nav-bar-avatar-border" src="http://serenityapp.s3.amazonaws.com/avatar-border.png"/>
        </div>
      </div>
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
      <div className="nav-bar">
        <div className="logo-container">
          <NavLink exact to={sessionUser ? '/dashboard' : '/'} id="title">
            <h1 className="title-text">Serenity</h1>
            <img draggable="false" className="lavender-img" src={Lavender} />
          </NavLink>
        </div>
        
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
};

export default NavBar;