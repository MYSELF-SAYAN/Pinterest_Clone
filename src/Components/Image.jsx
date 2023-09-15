import React,{useEffect} from "react";
import { FiDownload } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { storage, auth, db } from "../Config/Firebase_Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Image = ({ url, desc, title, user, email, likes,id }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
console.log("key is",id)
useEffect(() => {
  if (typeof likeCount !== 'undefined') {
    const arrayRef = doc(db, "posts", id);
    updateDoc(arrayRef, {
      likes: likeCount,
    });
   
  }
  if (email) {
    const array1Ref = doc(db, "user", email);
    updateDoc(array1Ref, {
      likes: likeCount,
    });
  }
}, [liked])
  return (
    <div class="card cursor-pointer">
      <img src={url} alt="Card " className="card-img" />
      <div className="card-content">
        <div
          className="like text-3xl p-2 bg-white"
          onClick={() => {
            setLiked(!liked);
            if (liked) {
              setLikeCount(likeCount - 1);
              const arrayRef = doc(db, "posts", email);
            } else {
              setLikeCount(likeCount + 1);
            }
          }}
        >
          {liked ? (
            <AiFillHeart className=" text-red-500" />
          ) : (
            <AiOutlineHeart />
          )}
          <p className="text-lg ">{likeCount}</p>
        </div>
        <div className="download-button">
          <FiDownload />
        </div>
        <h2 className="card-title">{title}</h2>
        <h5 className="card-desc">{desc}</h5>
        <h3 className="card-user">By:- {user}</h3>
      </div>
    </div>
  );
};

export default Image;
