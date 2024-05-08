import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/BottomNavBar.css';

function BottomNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bottom-nav-bar">
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink
            to="/threads"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Threads
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/leaderboards"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Leaderboards
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavBar;
