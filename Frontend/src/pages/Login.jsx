import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!identifier.trim() || !password) {
            setError("Enter your email or username and password.");
            return;
        }
        setSubmitting(true);
        try {
            const payload = identifier.includes("@")
                ? { email: identifier.trim(), password }
                : { username: identifier.trim(), password };
            await login(payload);
            toast.show("Welcome back");
            navigate(location.state?.from?.pathname || "/", { replace: true });
        } catch (err) {
            setError(err?.response?.data?.message || "Couldn't sign you in.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <h1>Sign in</h1>
                <p className="subtitle">Pick up where you left off.</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="identifier">Email or username</label>
                        <input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    {error && <p className="field-error" style={{ marginBottom: 16 }}>{error}</p>}
                    <button className="btn btn--primary btn--full" disabled={submitting}>
                        {submitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="auth-footer">
                    New to VideoTube? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
