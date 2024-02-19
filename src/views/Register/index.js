import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from '../../config/firebase'
import './input.css'

export default function Register() {
    const navigate = useNavigate()
    const [fullname, setFullname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const signup = async (e) => {
        e.preventDefault();

        try {
            await register({ fullname, email, password });
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Register</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span onClick={() => navigate('/login')} className="link-primary">
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            onChange={(e) => setFullname(e.target.value)}
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={(e) => signup(e)} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p onClick={() => navigate('/reset')} className="text-center mt-2 cursor-pointer">
                        Forgot password?
                    </p>
                </div>
            </form>
        </div>
    )
}
