// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import logo from "../../images/airbnb-128.png"
import './Navigation.css';
import LogInModal from '../LogInModal';
import SignupModal from '../SignupModal';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory()

  const [islogInOpen, setIsLogInOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  const openLogInModal = () => {
    setIsLogInOpen(true);
    history.push('/');
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
    history.push('/');
  };

  const handleLoginSuccess = () => {
    setIsLogInOpen(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupOpen(false);
  };



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='logged_in_icon'>
        <button className='create-spot-button'><NavLink to="/create-spot" className="create_spot_link">Create a New Spot</NavLink></button>
        {/* <button onClick={logout}>Log Out</button> */}
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className='not_logged_in'>
        <button onClick={openLogInModal} className="sign-log-in-link"><NavLink to="/login" className="sign-log-in-link">Log In</NavLink></button>
        <button onClick={openSignupModal} className="sign-log-in-link"><NavLink to="/signup" className="sign-log-in-link">Sign Up</NavLink></button>
      </li>
    );
  }


  return (
    <div className='nav-container'>
      <ul className='nav-ul'>
        <li className='nav-li'>
          <NavLink exact to="/"><img src={logo} alt="logo" className='logo' /></NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
      <LogInModal open={islogInOpen} onClose={() => setIsLogInOpen(false)}><LoginFormPage onSuccess={handleLoginSuccess} /></LogInModal>
      <SignupModal open={isSignupOpen} onClose={() => setIsSignupOpen(false)}><SignupFormPage onSuccess={handleSignupSuccess} /></SignupModal>


    </div>
  );
}

export default Navigation;
