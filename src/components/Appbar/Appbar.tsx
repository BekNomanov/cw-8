import React from 'react';
import {NavLink} from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Blog</span>
        <ul className="navbar-nav mr-auto flex-nowrap flex-row gap-3">
          <li className="nav-item">
            <NavLink to="/quotes" className="nav-link">Quotes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Add" className="nav-link">Add Form</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;