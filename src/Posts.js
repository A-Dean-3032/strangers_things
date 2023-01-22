import { useNavigate } from "react-router-dom";
import './Posts.css';
import { useParams } from 'react-router-dom'

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

const Posts = (props) => {
  const { posts, setPosts, token } = props
  const navigate = useNavigate();

  async function postFetcher(){

    if (token) {
      try {
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
        console.log('Fetched with token');
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    } else {
    try {
      const response = await fetch(`${Base_URL}/${Cohort_Name}/posts`);
      const json = await response.json();
      const jsonData = await json.data.posts;
      setPosts(jsonData);
    } catch (error) {
      console.log("Failed to fetch posts");
      console.error(error);
    }
    }
  }

  return (
    <div>
      <button
      onClick={(e) => {
        e.preventDefault();
        postFetcher();
      }}
      >
        Find Posts
      </button>
      <button
      onClick={() => {
        navigate('/posts/create')
      }}>
        New Post
      </button>
      <ul className="postsList">
            {posts.map((post) => {
              return (
                <li className='individualPost' key={post._id}>
                  <h4 
                  className="postsTitle"
                  >{post.title}</h4>
                  <span 
                  className="postsDescription
                  ">{post.description}</span>
                  <button
                  className="viewButton"
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
    </div>
  );
};

const CreatePost = (props) => {
  let titleValue;
  let descriptionValue;
  let priceValue;
  let locationValue;
  let deliverValue;
  const { token, posts, setPosts } = props;
  const navigate = useNavigate();

  async function createPostHandler() {
   deliverValue = document.getElementById('deliverCheckbox').checked
    console.log(token)
    try {
      const response = await fetch (`${Base_URL}/${Cohort_Name}/posts`, 
      {
        method:'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
          post: {
            title: `${titleValue}`,
            description: `${descriptionValue}`,
            price: `${priceValue}`,
            location: `${locationValue}`, 
            willDeliver: `${deliverValue}`
          }
        }
        ) 
      }
    )

    const json = await response.json();
    console.log(json);
    if (json.success) {
      posts.push(json.data.post);
      setPosts(posts);
      navigate('/posts')
      console.log('Success!')
    } else if (!json.success) {
      console.log(token);
    }

    } catch (error) {
      console.error(error);
    }

}

  return (
    <>
      <h4>New Post</h4>
      <form>
        <div>Title
          <input
          onChange={(e) => {
            titleValue=e.target.value;
          }}
          ></input>
        </div>
        <div>Description
          <input
            onChange={(e) => {
              descriptionValue=e.target.value;
            }}
          ></input>
        </div>
        <div>Price
          <input
            onChange={(e) => {
              priceValue=e.target.value;
            }}
          ></input>
        </div>
        <div>Location
          <input
            onChange={(e) => {
              locationValue=e.target.value;
            }}
          ></input>
        </div>
        <div>Will deliver?
          <input id='deliverCheckbox' type='checkbox' ></input>
        </div>
        <button onClick={(e) => {
          e.preventDefault();
          createPostHandler();
        }}>
          Create Post
        </button>
      </form>
    </>
  )
}

const SinglePost = (props) => {
  let { postId } = useParams();
  const { posts } = props
  const post = posts.filter((post)=> post._id === postId)[0];
  console.log(post);

  return (
    <>
    <h3>
      {post.title}
    </h3>
    <p className="postDescription">{post.description}</p>
    <p className="postPrice">{post.price}</p>
    <p className="postAuthor">{post.author.username}</p>
    <p className="postLocation">{post.location}</p>
    <p className="postWillDeliver">{post.willDeliver}</p>
    </>
  )
}

export { CreatePost, Posts, SinglePost };
