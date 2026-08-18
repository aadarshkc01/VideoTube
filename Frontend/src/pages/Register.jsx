import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const Register = () => {
    const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
    const [avatarFile, setAvatarFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const avatarInputRef = useRef(null);
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!avatarFile) {
            setErrors({ avatar: "An avatar image is required." });
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value.trim()));
            formData.append("avatar", avatarFile);

            await registerUser(formData);
            await login({ email: form.email.trim(), password: form.password });
            toast.show("Account created");
            navigate("/", { replace: true });
        } catch (err) {
            const apiErrors = err?.response?.data?.errors;
            if (Array.isArray(apiErrors) && apiErrors.length) {
                const fieldErrors = {};
                apiErrors.forEach((fe) => {
                    if (fe.field) fieldErrors[fe.field] = fe.message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ form: err?.response?.data?.message || "Couldn't create your account." });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <h1>Create your account</h1>
                <p className="subtitle">Takes less than a minute.</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="fullName">Full name</label>
                        <input id="fullName" value={form.fullName} onChange={update("fullName")} autoComplete="name" />
                        {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input id="username" value={form.username} onChange={update("username")} autoComplete="username" />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={form.email} onChange={update("email")} autoComplete="email" />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={update("password")}
                            autoComplete="new-password"
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <div className="field">
                        <label>Avatar</label>
                        <div className="file-drop" onClick={() => avatarInputRef.current?.click()}>
                            {avatarFile ? avatarFile.name : "Click to choose an image"}
                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        {errors.avatar && <span className="field-error">{errors.avatar}</span>}
                    </div>

                    {errors.form && <p className="field-error" style={{ marginBottom: 16 }}>{errors.form}</p>}

                    <button className="btn btn--primary btn--full" disabled={submitting}>
                        {submitting ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
