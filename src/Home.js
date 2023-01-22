import { useEffect } from "react";
import { Link } from 'react-router-dom'
const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

function Home(props) {
  const { username, setUsername, password, setPassword, token, setToken } =
    props;

  useEffect(() => {
    // setToken(localStorage.getItem('Token_Storage'));
    checkUser();
  }, []);

  async function checkUser() {
    const response = await fetch(`${Base_URL}/${Cohort_Name}/users/me`,
     {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          setUsername(result.data.username);
        }
      }).catch(console.error);

      }

  return (
    <div>
      <div id='navbar'>
        <button><Link to='profile'>Profile</Link></button>
        <button><Link to='/posts'>Posts</Link></button>
        <button><Link to='/login'>Login</Link></button>
        <button><Link to='register'>Sign Up</Link></button>
      </div>
      <h2>Home</h2>
      <p>Token: {token}</p>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
    </div>
  );
}

export default Home;
