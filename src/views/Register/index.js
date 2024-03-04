import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from '../../config/firebase'
import './input.css'
import { Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

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
                    <div className="text-start">
                        Already registered?{" "}
                        <span onClick={() => navigate('/login')} className="link-primary">
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <Input
                            onChange={(e) => setFullname(e.target.value)}
                            type="text"
                            // className="form-control mt-1"
                            size="large"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            // className="form-control mt-1"
                            size="large"
                            placeholder="Email Address"
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
                        <button onClick={(e) => signup(e)} className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
