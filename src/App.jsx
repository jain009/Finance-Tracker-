import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/signup";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
