import React from 'react';

import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='h-[100vh] w-[10rem] bg-gray-200 py-5'>
      
    <ul className='mt-5 '>
    <Link>
        <li className='text-xl font-extrabold my-5 hover:bg-slate-600 hover:text-white px-5 h-10 flex justify-center items-center'>Profile</li>
        </Link>
        <li className="text-xl font-extrabold my-5 hover:bg-slate-600 hover:text-white px-5 h-10 flex justify-center items-center">Posts</li>
    </ul>
   </div> 
  );
}

export default Sidebar;
