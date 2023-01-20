import './register.css'

const Base_URL = "https://strangers-things.herokuapp.com/api";
const Cohort_Name = "2209-ftb-et-web-pt";

function Register(props) {
  let passwordReEntry ='';
  let passwordMatch = document.getElementById('passwordMatch');

    async function registerHandler () {
      if (props.password === passwordReEntry) {
      passwordMatch.classList.remove('yesshow');
      passwordMatch.classList.add('noshow');
      const body = JSON.stringify({
        user: {
          username: props.username,
          password: props.password,
        },
      })
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
      if (json.success) {
        localStorage.setItem('Token_Storage', json.data.token);
        setToken(json.data.token);
        console.log('Registration successful');
        document.getElementById('usernameInput').value='';
        document.getElementById('passwordInput').value='';
        document.getElementById('reentryInput').value='';
      } else if (!json.success) {
        console.log('Failed to register, that username is taken');
        document.getElementById('passwordInput').value='';
        document.getElementById('reentryInput').value='';
      }
    } catch (e) {
      console.log('Unable to register');
      console.error(e);
    }
  } else if (props.password !== passwordReEntry) {
    passwordMatch.classList.add('yesshow');
    passwordMatch.classList.remove('noshow');
  }
    }


  return (
    <form>
      <div>Username</div>
        <input
          id = "usernameInput"
          onChange={(e) => {
            props.setUsername(e.target.value);
          }}
          minLength = "3"
          required
        ></input>
        <div>Password</div>
        <input
          type={"password"}
          id = "passwordInput"
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
          minLength = "6"
          required
        ></input>
        <div>Re-enter your password</div>
        <input
          type={"password"}
          id = "reentryInput"
          onChange={(e) => {
            passwordReEntry = e.target.value;
          }}
          minLength = "6"
          required
        ></input>
        <button 
          onClick={(e) => {
            e.preventDefault();
            registerHandler();
          }}
          id="registerButton"
        >
          Register your account! 
        </button>
        <div className="noshow" id='passwordMatch'>Password entries must match</div>
    </form>
    
  )
}

export default Register;
