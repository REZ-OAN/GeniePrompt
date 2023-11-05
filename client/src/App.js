import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Summary from "./pages/Summary";
import Promptgen from "./pages/Promptgen";
import Protected from "./pages/Protected";
function App() {
    return (
        <>
            <Navbar />
            <Toaster />
            <Routes>
                <Route path="/" element={<Protected Component={Home} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/summary"
                    element={<Protected Component={Summary} />}
                />
                <Route
                    path="/promptgen"
                    element={<Protected Component={Promptgen} />}
                />
            </Routes>
        </>
    );
}

export default App;
