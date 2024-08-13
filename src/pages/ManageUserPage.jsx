// ManageUsersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone) return;
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: '', email: '', phone: '' });
      toast.success('User added successfully!');
    } catch (error) {
      setError('Error adding user');
      toast.error('Error adding user');
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, editingUser);
      setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
      setEditingUser(null);
      toast.success('User updated successfully!');
    } catch (error) {
      setError('Error updating user');
      toast.error('Error updating user');
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success('User deleted successfully!');
    } catch (error) {
      setError('Error deleting user');
      toast.error('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Users</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded mb-2 w-full md:mb-0"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded mb-2 w-full md:mb-0"
          />
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 border rounded mb-2 w-full md:mb-0"
          />
          <button
            onClick={handleAddUser}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <FaPlusCircle />
            <span>Add User</span>
          </button>
        </div>
      </div>
      {editingUser && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border rounded mb-2 w-full md:mb-0"
            />
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded mb-2 w-full md:mb-0"
            />
            <input
              type="text"
              name="phone"
              value={editingUser.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 border rounded mb-2 w-full md:mb-0"
            />
            <button
              onClick={handleEditUser}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center space-x-2"
            >
              <FaEdit />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 bg-white"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-700 mb-1">Email: {user.email}</p>
              <p className="text-gray-700 mb-4">Phone: {user.phone}</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition flex items-center justify-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition flex items-center justify-center space-x-2"
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsersPage;
