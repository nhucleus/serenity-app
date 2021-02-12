import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from "../../store/auth";
import Lavender from "./lavender.png";
import "./NavBar.css";


const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const email = "demo@aa.io";
  const password = "password";

  const handleDemoClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
          <NavLink exact to={ sessionUser ? '/dashboard' : '/' } id="title">
            <h1>Serenity</h1>
          </NavLink>
        </li>
        <li><img className="lavender-img" src={Lavender} /></li>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default NavBar;