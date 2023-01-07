import { useState } from "react";
import './register.css'

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

function Register(props) {
  let passwordReEntry ='';
  let passwordMatch = document.getElementById('passwordMatch');
  console.log(passwordMatch);

    function matchChecker() {
      if (passwordMatch.classList.contains('noshow')) {
        passwordMatch.classList.add('yesshow');
        passwordMatch.classList.remove('noshow');
      }
    }

    async function registerHandler () {
      passwordMatch.classList.remove('yesshow');
      passwordMatch.classList.add('noshow');
      const body = JSON.stringify({
        user: {
          username: props.username,
          password: props.password,
        },
      })

    const token = props.token;
    const setToken = props.setToken
    
    try{
      const response = await fetch (`${Base_URL}/${Cohort_Name}/users/register`, 
      {
        method:'POST', 
        headers: {
          'Content-Type': 'application/json',
        }, 
        body, 
      }
    )

      const json = await response.json();
      console.log(json);
      console.log(props.username);
      console.log(props.password)
      if (json.success) {
        localStorage.setItem('Token_Storage', json.data.token);
        setToken(json.data.token);
        console.log('Registration successful')
      } else if (!json.success) {
        console.log('Failed to register, that username is taken')
      }
    } catch (e) {
      console.log('Unable to register');
      console.error(e);
    }
  }



  return (
    <form>
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
        <div>Re-enter your password</div>
        <input
          type={"password"}
          onChange={(e) => {
            // props.setPassword(e.target.value);
            passwordReEntry = e.target.value;
          }}
        ></input>
        <button 
          onClick={(props.password === passwordReEntry) ? registerHandler : matchChecker 
          }
        >
          Register your account! 
        </button>
        <div className="noshow" id='passwordMatch'>Password entries must match</div>
    </form>
    
  )
}

export default Register;
