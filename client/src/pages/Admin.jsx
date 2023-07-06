import React, { useState, useEffect } from 'react';

const Admin = () => {
  // Fetch DB JSON
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3500/users'); // Replace with the actual API route for fetching users
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);  // Initially, all users are shown
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const filterUsers = () => {
      const newFilteredUsers = users.filter(user => {
        return (nameFilter ? user.name.includes(nameFilter) : true) && 
               (usernameFilter ? user.username.includes(usernameFilter) : true) &&
               (statusFilter ? user.status === statusFilter : true);
      });
      setFilteredUsers(newFilteredUsers);
    };

    filterUsers();
  }, [nameFilter, usernameFilter, statusFilter, users]);

  // Filter Handlers
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  const handleUsernameFilterChange = (event) => {
    setUsernameFilter(event.target.value);
  };
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className='admin-wrapper'>

        <aside className="filters">
            <h3>Filters</h3>
            <div className="filters-wrapper">

              <div className='filter-container'>
                    <label><b>Name:</b></label>
                    <input type="text" onChange={handleNameFilterChange} placeholder='Type any word'/>
                </div>
                
                <div className='filter-container'>
                  <label><b>Username:</b></label>
                  <input type="text" onChange={handleUsernameFilterChange} placeholder='Type any word'/>
                </div>

                <div className='filter-container'>
                  <label><b>Status:</b> </label>
                  <select onChange={handleStatusFilterChange}>
                    <option value="">All</option>
                    <option value="master">Master</option>
                    <option value="user">User</option>
                    <option value="client">Client</option>
                  </select>
                </div>
               
                
            </div>
          </aside>

          <section>
        <h1>User List</h1>
        {filteredUsers.map(user => (
          <div key={user.id}>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Status:</b> {user.status}</p>
            <a href={`/users/${user.id}`}>View</a>
            <hr />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
