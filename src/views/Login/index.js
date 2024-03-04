import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, getCurrentUser } from '../../config/firebase'
import './input.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

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
                    <div className="text-start">
                        Not registered yet?{" "}
                        <span onClick={() => navigate('/register')} className="link-primary">
                            Register
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            // className="form-control mt-1"
                            size="large"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            type="input password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            // className="form-control mt-1"
                            size="large"
                            placeholder="Enter password"
                        />
                    </div>
                    <p onClick={() => navigate('/reset')} className="text-end mt-4 cursor-pointer">
                        Forgot password?
                    </p>
                    <div className="d-grid gap-2 mt-2">
                        <button onClick={(e) => signin(e)} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
