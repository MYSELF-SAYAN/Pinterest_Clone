import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, db } from "../Config/Firebase_Config";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { logInUser } from "../Store/Slices/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCred, setLoginCred] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sign_in = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      const userData = await getDoc(doc(db, "user", email));
      if (userData.exists()) {
        const userLoginData = userData.data();
        setLoginCred(userLoginData);
        dispatch(logInUser(userLoginData));
      } else {
        console.log("No user data found");
      }
      navigate("/");
      console.log("Succesfully signed in ");
    } catch (err) {
      console.log(err);
    }
  };
  const sign_out = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col  justify-center border-2 border-gray-500 w-[30%] rounded-xl p-5">
        <h1 className="text-center mb-5 text-3xl text-gray-400">Log In</h1>
        <form
          action="submit"
          className="flex flex-col justify-center items-center mb-5"
          onSubmit={sign_in}
        >
          <input
            type="email"
            value={email}
            placeholder="Enter email "
            className="w-[100%] h-10 border-2 outline-none px-5 rounded-3xl bg-gray-200 placeholder:text-gray-400 mb-5 placeholder:text-sm"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            value={password}
            placeholder="Enter a password"
            className="w-[100%] h-10 border-2 outline-none px-5 rounded-3xl bg-gray-200 placeholder:text-gray-400 mb-5 placeholder:text-sm"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-20 h-10 p-2 border-2 border-gray-400 rounded-3xl text-gray-400 font-bold hover:bg-[#E60023] hover:text-white hover:border-none "
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="flex w-full justify-center items-center flex-col">
          <p className="text-xl mb-5">or</p>

          <button className="flex w-28 h-10 p-2 border-2 border-gray-400 rounded-3xl  hover:bg-slate-300 font-bold items-center justify-center ">
            {" "}
            <span>
              <FcGoogle className="mx-2" />
            </span>
            Google{" "}
          </button>
        </div>

        <p className="text-center mb-5 mt-5 text-md text-gray-400">
          Dont have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500 font-extrabold">Sign Up</span>
          </Link>
        </p>
      </div>
      <button onClick={sign_out}>sign out</button>
    </div>
  );
};

export default Login;
