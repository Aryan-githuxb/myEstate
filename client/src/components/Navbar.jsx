import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ toggleTheme, isDark }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">myEstate</Link>
      <div className="nav-links">
        <button onClick={toggleTheme} className="btn btn-secondary">
          {isDark ? "☀️" : "🌙"}
        </button>
        {user ? (
          <>
            <span>Hello, <b>{user.name}</b></span>
            <Link to="/create" className="btn btn-primary">Post Property</Link>
            <button onClick={logout} className="btn btn-danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}