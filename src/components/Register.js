import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!termsAccepted) {
            alert("You must accept the terms and conditions");
            return;
        }
        
        const data = { name, email, password };
        console.log(name, email, password);
        
        axios.post('https://mern-app-8.onrender.com/register', data)
            .then(result => {
                console.log(result.data)
                navigate('/')
            }
        )
            .catch((err) => { console.log(err) });
        };

    return (
        <div className="bigwrapper">
            <div className="wrapper">
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            placeholder="Create password"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                    <div className="policy">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(event) => { setTermsAccepted(event.target.checked) }}
                        />
                        <h3>I accept all terms & conditions</h3>
                    </div>
                    <div className="input-box button">
                        <input type="submit" value="Register Now" />
                    </div>
                    <div className="text">
                        <h3>Already have an account? <a href="http://localhost:3000/login">Login now</a></h3>
                    </div>
                </form>
            </div>
        </div>
    );
}
