import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getuser', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="section-container">
      {/* Banner */}
      

      {/* Table for users */}
      <div className="my-10 bg-red">
        <div className="overflow-x-auto">
          <table className="table min-w-full bg-white border border-gray-300">
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th className="text-center py-2 px-4">#</th>
                <th className="text-center py-2 px-4">Name</th>
                <th className="text-center py-2 px-4">Email</th>
                <th className="text-center py-2 px-4">Role</th>
                <th className="text-center py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-2 px-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-center py-2 px-4 border-b">{index + 1}</td>
                    <td className="text-center py-2 px-4 border-b">{user.name}</td>
                    <td className="text-center py-2 px-4 border-b">{user.email}</td>
                    <td className="text-center py-2 px-4 border-b">{user.role}</td>
                    <td className="text-center py-2 px-4 border-b">
                      <button
                        className="btn btn-ghost btn-xs text-red text-lg"
                        onClick={() => console.log('Delete user', user.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-2 px-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
