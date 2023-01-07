

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

const Posts = (props) => {
  const posts = props.posts;
  const setPosts = props.setPosts

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       try {
  //         const response = await fetch(`${Base_URL}/${Cohort_Name}/posts`);
  //         const json = await response.json();
  //         const jsonData = await json.data.posts;
  //         setPosts(jsonData);
  //       } catch (error) {
  //         console.log('Failed to fetch posts');
  //         console.error(error);
  //       }
  //     }
  //     fetchPosts();
  //   }, []
  // )

  return (
    <div>
      <button
        onClick={async () => {
          try {
            const response = await fetch(`${Base_URL}/${Cohort_Name}/posts`);
            const json = await response.json();
            const jsonData = await json.data.posts;
            setPosts(jsonData);
          } catch (error) {
            console.log("Failed to fetch posts");
            console.error(error);
          }
        }}
      >
        Find Posts
      </button>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <span>{post.description}</span>
            </li>
          );
        })}
      </ul>
    </div>

    // <div>
    //   <h2 key='title'>
    //     Posts
    //   </h2>
    //   <ul key='content'>
    //     {posts.map((post) => {
    //       return (
    //         <li key={post._id}>
    //           {post.title}
    //         </li> )
    //     })}
    //   </ul>
    // </div>
  );
};

export default Posts;
