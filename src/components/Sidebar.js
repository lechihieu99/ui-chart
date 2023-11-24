import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/6 bg-gray-950 flex flex-col py-4 items-center px-1 min-h-screen">
      <img
        src="https://static.ybox.vn/2023/10/6/1698477954059-pham-minh-nhut10fk619l-avatar.png"
        alt=""
        className="w-1/3 mt-1 rounded-full mx-auto " 
      />
      <ul className="w-full list-none flex flex-col justify-start color-white font-semibold border-t-1 border-solid border-white mt-4">
        <Link to="/" className="px-2 text-white font-semibold no-underline w-full py-4 text-sm rounded-xl hover:bg-white hover:text-black">
          Dashboard
        </Link>
        <Link to="/" className="px-2 text-white font-semibold no-underline w-full py-4 text-sm rounded-xl hover:bg-white hover:text-black">
          Teachers
        </Link>
        <Link to="/" className="px-2 text-white font-semibold no-underline w-full py-4 text-sm rounded-xl hover:bg-white hover:text-black">
          Students
        </Link>
        
    
      </ul>
    </div>
  );
}

export default Sidebar