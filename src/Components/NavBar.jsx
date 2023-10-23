import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setPage }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-2xl text-white font-semibold">My App</h1>
        <div>
          <button
            className="text-white hover:text-gray-200 mr-4"
            // onClick={() => setPage('form')}
          >
          <NavLink to={"/"}>
            YourForm</NavLink>
          </button>
          <button
            className="text-white hover:text-gray-200 mr-4"
            // onClick={() => setPage('card')}
          >
          <NavLink to={"/card"}>
            Card Page</NavLink>
          </button>
         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;