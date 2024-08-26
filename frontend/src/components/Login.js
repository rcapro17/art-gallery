import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

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
        localStorage.setItem('username', formData.username); // Save username
        alert('User logged in successfully');
        navigate('/itemList'); // Redirect to ItemList page
      })
      .catch((error) => console.error('Error logging in user:', error));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{ padding: '30px', width: '100%', maxWidth: '400px' }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome!
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Sign in to continue.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Button color="primary" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
