// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import logo from "../../images/logo.png"
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='logged_in_icon'>
        <NavLink to="/" className="create_spot_link">Create a New Spot</NavLink>
        {/* <button onClick={logout}>Log Out</button> */}
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className='not_logged_in'>
        <NavLink to="/login" className="sign-log-in-link">Log In</NavLink>
        <NavLink to="/signup" className="sign-log-in-link">Sign Up</NavLink>
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

    </div>
  );
}

export default Navigation;
