import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Image from "../Components/Image";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase_Config";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => {
    return state.auth.user;
  });
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = [];

      querySnapshot.forEach((doc) => {
        // Use doc.data() to access the document's data
        const postData = doc.data();
        postData.id = doc.id;
        console.log("post data is", postData)
        postsData.push(postData);
      });

      // Update the state with the fetched data
      setPosts(postsData);
      console.log(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <Navbar />
      Welcome {data}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid  grid-cols-4 gap-2 px-12 mt-5 ">
         {posts.map((postData) => {
  return (
    <Image
      url={postData.downloadURL}
      desc={postData.desc}
      title={postData.title}
      user={postData.user}
      email={postData.email}
      likes={postData.likes}
      id={postData.id} // Pass the document ID as a prop named 'id'
      key={postData.id} // Use the document ID as the key
    />
  );
})}
          <Image />
        </div>
      )}
    </div>
  );
};

export default Home;
