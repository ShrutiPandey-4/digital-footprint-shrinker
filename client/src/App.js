import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ⭐ Yeh route tumhe add karna hai */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
