import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5000/api/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUserData(res.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toLogin = ()=>{
    navigate('/chat');
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='profile-container'>
      {userData ? (
        <div>
          {/* Display user information */}
          <h2>Name: {userData.name}</h2>
          <h2>Email: {userData.email}</h2>
          <br></br>
          <p>(Welcome to our website! We're thrilled to have you here. Explore our latest offerings, discover valuable resources, and enjoy a seamless browsing experience. If you have any questions or need assistance, feel free to reach out to our support team. Thank you for visiting, and we hope you have a fantastic time exploring everything we have to offer!)</p>
          <br></br>
          <button onClick={handleLogout} className="logout-button"><h2>Log out</h2></button>
        </div>
      ) : (
        <div>
          <h1>Login to see profile</h1>
          <br></br>
          <button onClick={toLogin} className="logout-button"><h2>Login</h2></button>
         </div>
      )}
    </div>
  );
};

export default Profile;
