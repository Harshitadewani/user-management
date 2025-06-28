import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";
import UserTable from "./components/UserTable";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ get base URL from .env
const baseURL = process.env.REACT_APP_API_BASE;

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = "") => {
    try {
      const url = query
        ? `${baseURL}/api/search?query=${query}`
        : `${baseURL}/api/users`;
      const res = await axios.get(url);
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
      console.error("Fetch Users Error:", err);
    }
  };

  const addUser = async (userData) => {
    try {
      await axios.post(`${baseURL}/api/addUser`, userData);
      toast.success("User added successfully!");
      fetchUsers(searchQuery);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to add user");
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      await axios.put(`${baseURL}/api/updateUser/${id}`, updatedData);
      toast.success("User updated successfully!");
      setEditingUser(null);
      fetchUsers(searchQuery);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${baseURL}/api/deleteUser/${id}`);
        toast.success("User deleted successfully!");
        fetchUsers(searchQuery);
      } catch (error) {
        toast.error(error.response?.data?.message || "❌ Failed to delete user");
      }
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchUsers(query);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <div className="max-w-4xl mx-auto p-5">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <User
                  addUser={addUser}
                  editingUser={editingUser}
                  updateUser={updateUser}
                />
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <div className="mb-6 text-center">
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="border border-gray-300 rounded-lg p-2 w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <UserTable
                    users={users}
                    setEditingUser={setEditingUser}
                    deleteUser={deleteUser}
                  />
                  <div className="text-center mt-6">
                    <Link to="/">
                      <button className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
                        ← Back to Form
                      </button>
                    </Link>
                  </div>
                </>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
