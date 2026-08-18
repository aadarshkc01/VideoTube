import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Rail from "./Rail.jsx";

const Layout = () => (
    <div className="app-shell">
        <Header />
        <div className="app-body">
            <Rail />
            <main className="main">
                <Outlet />
            </main>
        </div>
    </div>
);

export default Layout;
