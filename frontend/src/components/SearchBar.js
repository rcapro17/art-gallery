import React from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ searchQuery, setSearchQuery, style }) {
  return (
    <TextField
      variant="outlined"
      align="center"
      label="Search by artist, category, or title"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={style}
      sx={{ display: 'flex', alignItems: 'cente', maxWidth: '300px' }}
    />
  );
}

export default SearchBar;
