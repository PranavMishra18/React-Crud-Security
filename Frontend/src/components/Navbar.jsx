import React from 'react';
import { NavLink,Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg border-2 border-indigo-600">
      <div className="navbar-start">

        <Link to = '/' className="btn btn-ghost normal-case text-xl font-bold text-primary">
           REAUD
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
          
          <NavLink to={'/'} className={({isActive}) => (isActive ? 'bg-orange-700 focus:bg-orange-700' : 'hover:bg-orange-700 focus:bg-orange-700')}>Home</NavLink>
          </li>
          <li>
          <NavLink to={'/about'} className={({isActive}) => (isActive ? 'bg-orange-700 focus:bg-orange-700' : 'hover:bg-orange-700 focus:bg-orange-700')}>About</NavLink>
          </li>
          <li>
          <NavLink to={'/create'} className={({isActive}) => (isActive ? 'bg-orange-700 focus:bg-orange-700' : 'hover:bg-orange-700 focus:bg-orange-700')}>Create User</NavLink>
          </li>
          <li>
          <NavLink to={'/contact'} className={({isActive}) => (isActive ? 'bg-orange-700 focus:bg-orange-700' : 'hover:bg-orange-700 focus:bg-orange-700')}>Contact</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <button className="btn btn-primary btn-sm md:btn-md">Get Started</button>
      </div>
    </div>
  );
}

export default Navbar;
