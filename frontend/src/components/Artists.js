import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/artists/')
      .then((response) => {
        const fetchedArtists = response.data;
        setArtists(fetchedArtists);
      })
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {artists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                maxWidth: '300px',
                margin: 'auto',
              }}
            >
              <CardMedia
                component="img"
                height="350"
                image={artist.foto} // Updated prop
                title={artist.name} // Set title as the artist's name
                sx={{ cursor: 'pointer', objectFit: 'cover' }}
              />
              <CardContent sx={{ padding: '8px' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: '1rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Helvetica',
                    color: 'black',
                  }}
                >
                  {artist.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Artists;
