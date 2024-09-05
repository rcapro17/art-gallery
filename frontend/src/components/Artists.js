import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Artists({ artist }) {
  if (!artist) return null;

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: '50%',
                margin: '20px',
              }}
              image={artist.foto}
              title={artist.name}
            />
            <CardContent
              sx={{ flex: '1 0 auto', padding: '20px', width: '100%' }}
            >
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                {artist.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: 'justify', marginTop: '10px' }}
              >
                {artist.biography}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Artists;
