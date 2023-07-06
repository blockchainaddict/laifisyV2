import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams(); // get the ID from the URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3500/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError('Failed to fetch user');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='user-wrapper'>
      <h2 className='user-name'>{user.name}</h2>
      <p> <b>Username:</b> {user.username}</p>
      <p><b>Status:</b> {user.status}</p>
      <p><b>Number of contents:</b> {user.Contents.length}</p>
    </div>
  );
};

export default User;