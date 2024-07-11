import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import axios from 'axios';
import LoggedInContent from './LoggedInContent';
export default function Login(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isLoggedIn,setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post('https://mern-app-8.onrender.com/login', data);
      console.log(response.data); 

      if (response.data.success) {
        alert('Login successful!');
        setIsLoggedIn(true)
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.'); 
    }
  };
  
  return (
    <div>
      {isLoggedIn ? (
        <LoggedInContent/>
      ) : (
        <div className="container">
          <input type="checkbox" id="check" />
          <div className="login form">
            <header>Login</header>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                placeholder="Enter your email"
              />
              <input
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
              <a href="#">Forgot password?</a>
              <input type="submit" className="button" value="Login" />
            </form>
            <div className="signup">
              <span className="signup">
                Don't have an account?
                <label htmlFor="check"> Signup</label>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  
