import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import './input.css';
import { sendPasswordResetEmail } from "firebase/auth";

export default function Reset() {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValue = e.target.email.value;

        try {
            await sendPasswordResetEmail(auth, emailValue);
            alert('Check your email for the password reset link');
        } catch (err) {
            alert(err.code);
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Reset Password</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Reset
                        </button>
                    </div>
                    <p onClick={() => navigate('/login')} className="text-center mt-2 cursor-pointer">
                        Forgot password?
                    </p>
                </div>
            </form>
        </div>
    );
}
