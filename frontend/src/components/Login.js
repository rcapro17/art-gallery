import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/token/', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.access);
        alert('User logged in successfully');
      })
      .catch((error) => console.error('Error logging in user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
