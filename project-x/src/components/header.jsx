import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md h-20">
      <div className="flex items-center h-full">
        {/* Sky */}
        <div className="px-4 flex items-center h-full">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Sky
          </h1>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 h-full" />

        {/* Sky Immersion */}
        <div className="px-4 flex items-center h-full">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            <center>
            Sky Immersion
            </center>
          </p>
        </div>
      </div>

      {/* Admin Button */}
      <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300">
        Admin Login
      </button>
    </header>
  );
};

export default Header;

