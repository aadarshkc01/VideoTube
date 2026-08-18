import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, initializing } = useAuth();
    const location = useLocation();

    if (initializing) return <Loader />;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
