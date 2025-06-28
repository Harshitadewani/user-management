// components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navStyle = (path) =>
    location.pathname === path
      ? "bg-indigo-700 text-white"
      : "text-gray-700 hover:bg-gray-200";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center mb-6 rounded-b-xl">
      <h1 className="text-xl font-bold text-indigo-800">🚀 User Manager</h1>
      <div className="flex gap-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg font-medium transition ${navStyle("/")}`}
        >
          Home
        </Link>
        <Link
          to="/users"
          className={`px-4 py-2 rounded-lg font-medium transition ${navStyle("/users")}`}
        >
          Users
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;