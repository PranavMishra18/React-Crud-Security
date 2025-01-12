import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-screen"
      onMouseEnter={() => setIsOpen(true)}  // Open on hover
      onMouseLeave={() => setIsOpen(false)} // Close on mouse leave
    >
      {/* Collapsed Sidebar (Hamburger Icon) */}
      <div
        className="h-12 w-12 bg-gray-700 flex items-center justify-center text-white absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer"
      >
        ☰
      </div>

      {/* Expanded Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full bg-gray-800 shadow-lg transition-all duration-300 ease-in-out z-10 ${
          isOpen ? "w-60" : "w-0"
        } overflow-hidden`}
      >
        <Link to = '/' className="btn btn-ghost normal-case text-xl font-bold text-primary">
                   REAUD
        </Link>
        <hr />
        <ul className="p-2">
          <li className="py-2 px-4 hover:bg-gray-700 text-white rounded-md">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={'/'}>Home</NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 text-white rounded-md">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={'/about'}>About</NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 text-white rounded-md">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={'/create'}>Create User</NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 text-white rounded-md">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={'/contact'}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
