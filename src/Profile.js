import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

const Profile = (props) => {
  const { username, posts, token, setPosts } = props
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login')
    }
  })

  const [myPosts, setMyPosts] = useState([])

  async function postFetcher(){
      const response = await fetch (`${Base_URL}/${Cohort_Name}/posts`, 
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }, 
        })
      const json = await response.json();
      const jsonData = await json.data.posts;
      setPosts(jsonData);
      const filteredPosts = posts.filter((post) => 
      post.isAuthor
      );
      setMyPosts(filteredPosts);
      console.log(myPosts);
    }

  return (
    <>
      <h3 className="welcomeHeader">Welcome {username}!</h3>
      <button
      onClick={() => {
        postFetcher();
      }}
      >Get My Posts</button>
      <ul>
      {myPosts.map((post) => {
              return (
                <li key={post._id}>
                  <h4 
                  >{post.title}</h4>
                  <span 
                  >{post.description}</span>
                  <button
                  onClick={() => {
                    console.log(post)
                    navigate(`/posts/${post._id}`)
                  }}>
                  View
                  </button>
                  <button
                  className="deleteButton">
                    Delete
                  </button>
                </li>
              );
              })}
      </ul>
    </>
  )
}

export default Profile