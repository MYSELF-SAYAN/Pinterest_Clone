import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../Config/Firebase_Config";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const data = useSelector((state) => state.auth);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const email = data.email;
  const user = data.user;
  const profilePic = data.profilePic;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

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
            const docRef =  addDoc(collection(db, "posts"), {
              desc,
              downloadURL,
              title,
              email,
              user,
              likes: 0,
            });
            console.log(docRef.id)
            const arrayRef = doc(db, "user", data.email);
            const newPost = {
              desc,
              downloadURL,
              title,
              email,
              user,
              likes: 0,
            };
            updateDoc(arrayRef, {
              posts: arrayUnion(newPost),
            });
          });
        }
      );
        navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-[88.50vh] bg-gray-300 flex justify-center items-center ">
        <div className="parent w-[50%] h-[80%] p-10 bg-white rounded-3xl flex flex-col justify-center ">
          <form className="flex h-[80%] " onSubmit={handleSubmit}>
            {file ? (
              <div className="w-1/2 rounded-3xl overflow-hidden relative">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-fill"
                  alt=""
                />

                <label
                  htmlFor="openFile"
                  className="absolute bottom-0 bg- right-0 text-4xl text-white rounded-tl-3xl  p-2 bg-gradient-to-t from-slate-300 to-slate-500 cursor-pointer"
                >
                  <BiEdit />
                </label>
                <input
                  type="file"
                  hidden
                  id="openFile"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="w-1/2 border-2 border-gray-300 rounded-3xl ">
                <label htmlFor="fileUpload">
                  <div className="upload cursor-pointer flex flex-col justify-center items-center h-full">
                    <span className="text-5xl text-gray-300">
                      <IoMdAddCircle />
                    </span>
                    <p className="text-gray-300 text-xl">Click to upload</p>
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="fileUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            )}

            <div className="desc flex flex-col w-1/2 p-10">
              <input
                type="text"
                placeholder="Add your title"
                className="border-b-2 border-gray-300 placeholder:text-3xl h-14 outline-none px-2 text-3xl placeholder:px-2 mb-5"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tell everyone what your post is about"
                className="border-b-2 border-gray-300 placeholder:text-sm h-14 outline-none px-2 text-xl placeholder:px-2 mb-5"
                onChange={(e) => setDesc(e.target.value)}
              />
              <button
                className="w-[6rem] h-10 p-2 bg-white border-2 border-gray-300 rounded-3xl  font-bold hover:bg-[#E60023] hover:text-white hover:border-none mt-20"
                type="submit"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
