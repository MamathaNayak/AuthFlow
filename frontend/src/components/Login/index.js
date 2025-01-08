import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        mobile_number: mobileNumber,
        password: password,
      });
  
      const { token, user } = response.data;
  
      localStorage.setItem('authToken', token);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
  
     
      navigate('/landing', { state: { firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.message || 'Error logging in. Please try again.');
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
