import { useState, useEffect } from "react";

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${Base_URL}/${Cohort_Name}/posts`);
      const json = await response.json();
      const jsonData = json.data.posts;
      setPosts(jsonData);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 key='title'>
        Posts
      </h2>
      <ul key='content'>
        {posts.map((post) => {
          return (<li key={post._id}>
            {post.title}
          </li> )
        })}
      </ul>
    </div>
  );
};

export default Posts;
