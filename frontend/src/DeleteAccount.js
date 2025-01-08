// frontend/src/DeleteAccount.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
  const navigate = useNavigate();

  const userToken = localStorage.getItem('authToken');

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/delete-account', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      alert(response.data.message);
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account', error);
      alert('Error deleting account');
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default DeleteAccount;
