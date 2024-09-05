const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error state before a new login attempt
    axios
      .post('http://127.0.0.1:8000/api/token/', formData)
      .then((response) => {
        const token = response.data.access;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token); // Decode the token
        setUser(decoded); // Set user context
        alert('User logged in successfully');
        navigate('/itemList'); // Redirect to ItemList page
      })
      .catch((error) => {
        console.error('Error logging in user:', error);
        setError('Invalid username or password'); // Display error message
      });
  };
  