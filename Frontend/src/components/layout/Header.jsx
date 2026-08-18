import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import Avatar from "../common/Avatar.jsx";
import { SearchIcon, UploadIcon } from "../common/Icons.jsx";

const Header = () => {
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleLogout = async () => {
        setMenuOpen(false);
        await logout();
        toast.show("Signed out");
        navigate("/login");
    };

    return (
        <header className="header">
            <Link to="/" className="brand">
                <span className="brand-mark">VT</span>
                VideoTube
            </Link>

            <form className="header-search" onSubmit={handleSearch} role="search">
                <input
                    type="search"
                    placeholder="Search videos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search videos"
                />
                <button type="submit" aria-label="Search">
                    <SearchIcon width={17} height={17} />
                </button>
            </form>

            <div className="header-actions">
                {user ? (
                    <>
                        <Link to="/upload" className="btn btn--secondary btn--sm">
                            <UploadIcon width={16} height={16} />
                            Upload
                        </Link>
                        <div style={{ position: "relative" }} ref={menuRef}>
                            <button onClick={() => setMenuOpen((v) => !v)} aria-label="Account menu">
                                <Avatar src={user.avatar} alt={user.fullName} size={34} />
                            </button>
                            {menuOpen && (
                                <div className="menu">
                                    <div style={{ padding: "6px 12px 10px", borderBottom: "1px solid var(--border)", marginBottom: 6 }}>
                                        <p style={{ fontSize: 13.5, fontWeight: 500 }}>{user.fullName}</p>
                                        <p style={{ fontSize: 12, color: "var(--text-dim)" }}>@{user.username}</p>
                                    </div>
                                    <Link to={`/channel/${user.username}`} className="menu-item" onClick={() => setMenuOpen(false)}>
                                        Your channel
                                    </Link>
                                    <Link to="/dashboard" className="menu-item" onClick={() => setMenuOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Link to="/settings" className="menu-item" onClick={() => setMenuOpen(false)}>
                                        Settings
                                    </Link>
                                    <button className="menu-item menu-item--danger" onClick={handleLogout}>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="btn btn--primary btn--sm">
                        Sign in
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
