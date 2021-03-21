import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editAvatar } from "../../store/auth";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/auth";
import Lavender from "./lavender.png";
import AudioPlayer from "../Audio";
import "./NavBar.css";
import JournalModal from "../JournalModal";
import { RiHeartAddLine } from "react-icons/ri";

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const email = "demo@aa.io";
  const password = "password";

  useEffect(() => {
    if (sessionUser && sessionUser.avatar) {
      setPreview(sessionUser.avatar);
    }
  }, [sessionUser]);

  const handleDemoClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email, password }));
  };

  const updatePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const logout = () => {
    dispatch(sessionActions.logout());
  };

  const submitEditAvatar = () => {
    if (photo) {
      dispatch(editAvatar(photo));
      setTimeout(() => setModalOpen(false), 500);
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-bar-right">
        <AudioPlayer />
        <div className="nav-bar-avatar-container">
          <img
            draggable="false"
            className="nav-bar-avatar"
            src={sessionUser.avatar}
          />
          <img
            onClick={() => setModalOpen(true)}
            draggable="false"
            className="nav-bar-avatar-border"
            src="http://serenityapp.s3.amazonaws.com/avatar-border.png"
          />
        </div>
        <JournalModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setPhoto(null);
            setPreview(sessionUser.avatar);
          }}
        >
          <div className="profile-container">
            <div className="profile-header">Profile</div>
            <div className="profile-body">
              <div className="profile-body-left">
                <div className="profile-user-info">
                  <div className="profile-name">
                    {sessionUser.first_name} {sessionUser.last_name}
                  </div>
                  <div className="profile-username">{sessionUser.username}</div>
                  <div className="profile-email">{sessionUser.email}</div>
                </div>
                <button
                  className="profile-logout"
                  onClick={() => {
                    setModalOpen(false);
                    logout();
                  }}
                >
                  Log Out
                </button>
              </div>
              <div className="profile-body-right">
                <div className="edit-avatar-container">
                  <img
                    draggable="false"
                    className="edit-avatar"
                    src={preview}
                  />
                  <img
                    draggable="false"
                    className="edit-avatar-border"
                    src="http://serenityapp.s3.amazonaws.com/avatar-border.png"
                  />
                  <label htmlFor="edit-avatar-input" className="photo-upload">
                    <RiHeartAddLine className="edit-avatar-button" />
                  </label>
                  <input
                    id="edit-avatar-input"
                    type="file"
                    onChange={updatePhoto}
                  ></input>
                </div>
                <button onClick={submitEditAvatar} className="submit-avatar">
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </JournalModal>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <button className="nav-bar-button" onClick={handleDemoClick}>
          Demo Login
        </button>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="nav-bar__container">
      <div className="nav-bar">
        <div className="logo-container">
          <NavLink exact to={sessionUser ? "/dashboard" : "/"} id="title">
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
