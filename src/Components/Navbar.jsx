import React from 'react';
import { BsPinterest } from "react-icons/bs";
import {TbMessageCircle2Filled} from "react-icons/tb"
import { BsBellFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from "../Assets/pinterest.jpg"
const Navbar = () => {
  return (
    <div className='flex items-center w-full p-4'>
      <img src={logo} alt="" className='h-[50px] w-[50px] rounded-full p-2 hover:bg-gray-300' />
      <ul className="flex">
      <Link to="/">
        <button className=" text-white w-20 h-10 rounded-full bg-black">
        <li>Home</li>
        </button>
        </Link>
       <Link to='/create'>
        <button className="  w-20 h-10 rounded-full">
          <li>Create</li>
        </button>
        </Link>
      </ul>
      <div className="flex items-center  bg-gray-200 px-3 rounded-3xl h-12  w-full">
 
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-200  placeholder:text-l outline-none  px-3"
        />
      </div>
      <span className="p-2 rounded-full hover:bg-gray-200">
        <BsBellFill className="text-2xl text-gray-600 " />
      </span>

      <span className="p-2 rounded-full hover:bg-gray-200">
      <TbMessageCircle2Filled className="text-2xl text-gray-600 " />
      </span>
      <Link to="/profile">
      <img src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="" className='h-[50px] w-[50px] rounded-full p-2 hover:bg-gray-300'/>
      </Link>
    </div>
  );
}

export default Navbar;

