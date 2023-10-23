import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MAX_CHARACTERS = 30;

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ userData, onRemove }) => {
  return (
    <div className="max-w-md mx-auto mt-5 p-5 bg-gray-100 rounded-lg">
      {userData.map((user, index) => (
        <div key={index} className="mb-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
            <p className="text-gray-600 mb-2">{truncateText(user.about, MAX_CHARACTERS)}</p>
            <p className="text-blue-500 text-sm mb-2">Education: {user.education.length}</p>
            <Link to={`/details/${index}`} className="bg-blue-500 text-white p-2 rounded-md mr-2">
              View Details
            </Link>
            <button onClick={() => onRemove(index)} className="bg-red-500 text-white p-2 rounded-md">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
