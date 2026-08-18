import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Avatar from "../common/Avatar.jsx";
import { HeartIcon, HistoryIcon, HomeIcon, LibraryIcon } from "../common/Icons.jsx";

const linkClass = ({ isActive }) => `rail-link${isActive ? " active" : ""}`;

const Rail = () => {
    const { user } = useAuth();

    return (
        <nav className="rail" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
                <HomeIcon width={20} height={20} />
                Home
            </NavLink>
            {user && (
                <>
                    <NavLink to="/history" className={linkClass}>
                        <HistoryIcon width={20} height={20} />
                        History
                    </NavLink>
                    <NavLink to="/liked" className={linkClass}>
                        <HeartIcon width={20} height={20} />
                        Liked
                    </NavLink>
                    <NavLink to="/playlists" className={linkClass}>
                        <LibraryIcon width={20} height={20} />
                        Library
                    </NavLink>
                    <div className="rail-divider" />
                    <NavLink to={`/channel/${user.username}`} className={linkClass}>
                        <Avatar src={user.avatar} alt={user.fullName} size={20} />
                        You
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default Rail;
