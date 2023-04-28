import React, { useEffect, useState } from "react";
import { fetchMe } from "../api/users";
import AllPost from "./AllPost";
import EditPost from "./EditPost";
import { postMessage } from "../api/messages";
import { fetchPosts } from "../api/post";
import { deletePost } from "../api/post";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "./DeletePost";
import ViewPost from "./ViewPost";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { token } = useAuth();
  const { id } = useParams;
  console.log("Post from profile:", posts);

  useEffect(() => {
    async function myPage() {
      const fetchProfile = await fetchMe(token);
      console.log("result in ProfilePage:", fetchProfile);
      setMyProfile(fetchProfile.data.posts);
      setPosts(fetchProfile.data.posts); //this allows me to map through the post arrays
      // console.log(fetchProfile.data.posts);
      // ask why fetchProfile is reading success:false
      //answer: had to change [myPost, setMyPost] = useState({}) and import useAuth;
    }
    myPage();
  }, [token]);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>My Post:</h2>

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
          </div>
        );
      })}
      <h2>My Messages:</h2>
    </div>
  );
}
