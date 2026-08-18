import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Watch from "./pages/Watch.jsx";
import Channel from "./pages/Channel.jsx";
import Upload from "./pages/Upload.jsx";
import EditVideo from "./pages/EditVideo.jsx";
import Search from "./pages/Search.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Playlists from "./pages/Playlists.jsx";
import PlaylistDetail from "./pages/PlaylistDetail.jsx";
import History from "./pages/History.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/watch/:videoId"
                element={
                    <ProtectedRoute>
                        <Watch />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/channel/:username"
                element={
                    <ProtectedRoute>
                        <Channel />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <Upload />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit-video/:videoId"
                element={
                    <ProtectedRoute>
                        <EditVideo />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/search"
                element={
                    <ProtectedRoute>
                        <Search />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/playlists"
                element={
                    <ProtectedRoute>
                        <Playlists />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/playlists/:playlistId"
                element={
                    <ProtectedRoute>
                        <PlaylistDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/liked"
                element={
                    <ProtectedRoute>
                        <LikedVideos />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
);

export default App;
