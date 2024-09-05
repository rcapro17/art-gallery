import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import Button from '@mui/joy/Button';
import { CartContext } from '../context/CartContext';
import './ItemList.css'; // Import the CSS file
import { Spotlight } from './Spotlight';
import Artists from './Artists';

function ItemList() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/items/')
      .then((response) => {
        const fetchedItems = response.data;
        setFilteredItems(fetchedItems); // Use only setFilteredItems if items is not used.
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);

    if (item.artist && item.artist.id) {
      setSelectedArtist(item.artist);
    } else {
      console.error('No artist data found for item:', item);
      setSelectedArtist(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setSelectedArtist(null); // Clear selected artist on close
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="item-list-container">
      <Spotlight />
      <Grid container spacing={1} className="grid-container">
        {filteredItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={item.id}
            className="grid-item"
          >
            <Card className="card">
              <CardMedia
                component="img"
                height="350"
                image={item.image}
                title={item.title}
                onClick={() => handleClickOpen(item)}
                className="card-media"
              />
              <CardContent className="card-content">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="card-title"
                >
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions className="card-actions">
                <Button
                  size="small"
                  variant="outlined"
                  color="neutral"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedItem?.title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <img src={selectedItem?.image} alt="Selected" />
          <Typography variant="body2" color="text.secondary" paragraph>
            {selectedItem?.description}
          </Typography>
          <audio className="audio-and-button" controls>
            <source src={selectedItem?.audio_description} type="audio/mpeg" />
          </audio>
          <Button
            className="audio-and-button"
            size="small"
            variant="outlined"
            color="neutral"
            onClick={handleDrawerOpen}
          >
            Know the Artist
          </Button>
        </DialogContent>
      </Dialog>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: 350, // Adjusted width for better layout
            padding: '10px', // Added padding
          },
        }}
      >
        {selectedArtist ? (
          <Artists artist={selectedArtist} />
        ) : (
          <Typography variant="h6">No artist data available</Typography>
        )}
      </Drawer>
    </div>
  );
}

export default ItemList;
