import { Link } from "react-router-dom";
import StateBlock from "../components/common/StateBlock.jsx";

const NotFound = () => (
    <StateBlock
        title="Page not found"
        description="The page you're looking for doesn't exist or was moved."
        action={
            <Link to="/" className="btn btn--primary btn--sm">
                Back to home
            </Link>
        }
    />
);

export default NotFound;
