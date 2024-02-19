import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, getCurrentUser } from '../../config/firebase'
import './input.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        const checkAuthStatus = async () => {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                navigate('/');
            }
        };

        checkAuthStatus();
    }, [navigate]);


    const signin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await login({ email, password });

            // If login is successful, navigate to '/'
            if (userCredential) {
                navigate('/');
            } else {
                // Handle other cases if needed
            }

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span onClick={() => navigate('/register')} className="link-primary">
                            Register
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={(e) => signin(e)} className="btn btn-primary">
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
