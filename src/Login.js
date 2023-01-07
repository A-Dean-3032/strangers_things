import React from "react";
import { useNavigate } from 'react-router-dom';

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

const Login = (props) => {
  const navigate = useNavigate();

  async function loginHandler () {
    const body = JSON.stringify({
      user: {
        username: props.username, 
        password: props.password,
      }
    })

    const token = props.token;
    const setToken = props.setToken;

  try{  
    const response = await fetch (`${Base_URL}/${Cohort_Name}/users/login`, 
      {
        method:'POST', 
        headers: {
          'Content-Type': 'application/json',
        }, 
        body, 
      }
    )

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('Token_Storage', json.data.token);
        setToken(json.data.token)
        navigate('/')
      } else if (!json.success) {
        console.log('Incorrect username or password, try again')
      }
  } catch (e) {
    console.log('Failed to log in');
    console.error(e);
  }
  }
  return (
    <div>
      <div>Username</div>
        <input
          onChange={(e) => {
            props.setUsername(e.target.value);
          }}
        ></input>
        <div>Password</div>
        <input
          type={"password"}
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
        ></input>
        <button 
          onClick={loginHandler}
        >
          Log in 
        </button>
    </div>
  )

}

export default Login;