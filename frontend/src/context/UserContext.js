// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importação correta

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data); // Log fetched user data
        return data; // Supondo que a resposta do servidor contenha os dados do usuário, incluindo 'username'
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        fetchUserData(decoded.user_id).then((userData) => {
          if (userData) {
            setUser({ ...decoded, ...userData }); // Merging the decoded token data with fetched user data
          } else {
            setUser(decoded);
          }
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    } else {
      console.log('No token found in localStorage');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
