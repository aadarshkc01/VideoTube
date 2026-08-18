import { useRef, useState } from "react";
import {
    changePassword,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
} from "../api/auth.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Avatar from "../components/common/Avatar.jsx";

const Settings = () => {
    const { user, setUser } = useAuth();
    const toast = useToast();

    const [fullName, setFullName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [savingProfile, setSavingProfile] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            const updated = await updateAccountDetails({ fullName: fullName.trim(), email: email.trim() });
            setUser(updated);
            toast.show("Profile updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update profile");
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError("");
        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }
        setSavingPassword(true);
        try {
            await changePassword({ oldPassword, newPassword });
            setOldPassword("");
            setNewPassword("");
            toast.show("Password changed");
        } catch (err) {
            setPasswordError(err?.response?.data?.message || "Couldn't change password.");
        } finally {
            setSavingPassword(false);
        }
    };

    const handleAvatarPick = async (file) => {
        if (!file) return;
        try {
            const updated = await updateAvatar(file);
            setUser(updated);
            toast.show("Avatar updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update avatar");
        }
    };

    const handleCoverPick = async (file) => {
        if (!file) return;
        try {
            const updated = await updateCoverImage(file);
            setUser(updated);
            toast.show("Cover image updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update cover image");
        }
    };

    if (!user) return null;

    return (
        <div className="main--narrow">
            <div className="page-head">
                <h1>Settings</h1>
            </div>

            <div className="panel" style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>Profile photos</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                    <div style={{ textAlign: "center" }}>
                        <Avatar src={user.avatar} alt={user.fullName} size={72} />
                        <button
                            className="btn btn--ghost btn--sm"
                            style={{ marginTop: 8 }}
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            Change avatar
                        </button>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleAvatarPick(e.target.files?.[0])}
                        />
                    </div>
                    <div>
                        <button className="btn btn--secondary btn--sm" onClick={() => coverInputRef.current?.click()}>
                            Change cover image
                        </button>
                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleCoverPick(e.target.files?.[0])}
                        />
                    </div>
                </div>
            </div>

            <form className="panel" style={{ marginBottom: 24 }} onSubmit={handleProfileSave}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>Account details</h3>
                <div className="field">
                    <label htmlFor="fullName">Full name</label>
                    <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="btn btn--primary btn--sm" disabled={savingProfile}>
                    {savingProfile ? "Saving…" : "Save changes"}
                </button>
            </form>

            <form className="panel" onSubmit={handlePasswordChange}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>Change password</h3>
                <div className="field">
                    <label htmlFor="oldPassword">Current password</label>
                    <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div className="field">
                    <label htmlFor="newPassword">New password</label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                {passwordError && <p className="field-error" style={{ marginBottom: 16 }}>{passwordError}</p>}
                <button className="btn btn--primary btn--sm" disabled={savingPassword}>
                    {savingPassword ? "Updating…" : "Update password"}
                </button>
            </form>
        </div>
    );
};

export default Settings;
