import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import asset from "../Assets/pinterest.jpg";
import { useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { storage, auth, db } from "../Config/Firebase_Config";
import "../App.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updatePassword } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Image from "../Components/Image";
import {AiFillDelete} from "react-icons/ai"


const Profile = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [file, setFile] = useState("");
  const data = useSelector((state) => state.auth);
  const [password, setPassword] = useState(data.password);
  const [user, setUser] = useState(data.user);
  const fileInputRef = useRef(null);
  const [userData,setUserData] = useState()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const curuser = auth.currentUser;
      const docRef = doc(db, "user", data.email);
      const docsnap = await getDoc(docRef);

      await updatePassword(curuser, password);
      if (docsnap.exists()) {
        console.log(docsnap.data());
        await updateDoc(docRef, {
          email: data.email,
          password: password,
          user: user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
const fetchData = async () => {
    try {
      const docRef = doc(db, "user", data.email);
      const docsnap = await getDoc(docRef);
      if (docsnap.exists()) {
        const allData = docsnap.data()
        setUserData(allData.posts)
      }
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  fetchData()
}, [])
  useEffect(() => {
    const uploadImage = async () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, "user", data.email);
            updateDoc(docRef, {
              email: data.email,
              password: data.password,
              user: data.user,
              profilePic: downloadURL,
            });
          });
        }
      );
    };
    file && uploadImage();
  }, [file]);

  return (
    <div className="">
      <Link to="/">
        <span className="flex items-center  text-3xl   cursor-pointer text-gray-500 px-5 mt-5">
          <MdOutlineArrowBack className="text-gray-500" />
          Back
        </span>
      </Link>
      <div className="p-10 w-full flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-500">Profile</h1>
        <form
          className="flex justify-center items-center flex-col w-[70%]"
          onSubmit={handleSubmit}
        >
          <div className="container w-[8rem] h-[8rem] border-2 border-gray-300 rounded-full flex justify-center items-center my-7">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Avatar"
              className="image w-full h-full rounded-full  "
            />
            <div className="middle ">
              <button
                className="text p-2 rounded-[2rem] cursor-pointer text-xs"
                onClick={handleFileButtonClick}
              >
                Change Picture
              </button>
              <input
                type="file"
                hidden
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center mb-5">
            <input
              type="text"
              placeholder={data.user}
              className="placeholder:text-4xl text-4xl outline-none h-[3.5rem] px-3 bg-gray-200 rounded-s-2xl w-full"
              disabled={!toggleEdit}
              onChange={(e) => setUser(e.target.value)}
            />
            <span className=" p-5 h-[3.5rem] bg-gray-400 text-white text-3xl flex rounded-e-2xl items-center justify-center">
              <BiEditAlt
                onClick={() => {
                  setToggleEdit(!toggleEdit);
                }}
              />
            </span>
          </div>
          <div className="w-full flex justify-center items-center mb-5">
            <input
              type="text"
              placeholder={data.email}
              className=" placeholder:text-4xl text-4xl outline-none   h-[3.5rem] px-3 bg-gray-300 rounded-2xl w-full"
              disabled
            />
          </div>
          <div className="w-full flex justify-center items-center mb-3">
            <input
              type="password"
              placeholder={togglePassword ? data.password : "********"}
              className=" placeholder:text-4xl text-4xl outline-none   h-[3.5rem] px-3 bg-gray-300 rounded-s-2xl w-full"
              disabled={!togglePassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className=" p-5 h-[3.5rem] bg-gray-400 text-white text-3xl flex rounded-e-2xl items-center justify-center cursor-pointer">
              {togglePassword ? (
                <BsEyeFill onClick={() => setTogglePassword(!togglePassword)} />
              ) : (
                <BsEyeSlashFill
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              )}
            </span>
          </div>
          <button
            className="w-32 h-10 p-2 bg-white border-2 border-gray-300 rounded-3xl  font-bold hover:bg-[#E60023] hover:text-white hover:border-none m-10"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="posts">
          <h1 className="text-5xl font-extrabold text-gray-500 text-center mb-5">Posts</h1>
          <div className="grid grid-cols-3 gap-3">
                {userData && userData.map((post) => {
                  return (
                    <div class="card cursor-pointer">
                    <img src={post.downloadURL} alt="Card " className="card-img" />
                    <div className="card-content">
                      
                     <div className="download-button text-red-600">
                      <AiFillDelete/>
                     </div>
                      <h2 className="card-title">{post.title}</h2>
                      <h5 className="card-desc">{post.desc}</h5>
                      <h3 className="card-user">By:- {post.user}</h3>
                    </div>
                  </div>
                  );
                  
                }
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
