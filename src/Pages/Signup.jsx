import React, { useState } from "react";
import { auth, googleProvider, db } from "../Config/Firebase_Config";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sign_up = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "user", email), {
      email,
      user,
      password,
      profilePic:
        "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
      posts: [],
      likes: 0,
    });
    navigate("/login");
    console.log("Succesfully signed up ");
  };
  const sign_up_google = async () => {
    await signInWithPopup(auth, googleProvider);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col  justify-center border-2 border-gray-500 w-[30%] rounded-xl p-5">
        <h1 className="text-center mb-5 text-3xl text-gray-400">Sign Up</h1>
        <form
          className="flex flex-col justify-center items-center mb-5"
          onSubmit={sign_up}
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
            type="text"
            value={user}
            placeholder="Enter your username"
            className="w-[100%] h-10 border-2 outline-none px-5 rounded-3xl bg-gray-200 placeholder:text-gray-400 mb-5 placeholder:text-sm"
            onChange={(e) => {
              setUser(e.target.value);
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

          <button
            className="flex w-28 h-10 p-2 border-2 border-gray-400 rounded-3xl  hover:bg-slate-300 font-bold items-center justify-center "
            onClick={sign_up_google}
          >
            {" "}
            <span>
              <FcGoogle className="mx-2" />
            </span>
            Google{" "}
          </button>
        </div>

        <p className="text-center mb-5 mt-5 text-md text-gray-400">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-500 font-extrabold">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
