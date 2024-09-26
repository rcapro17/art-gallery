import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Spotlight } from './Spotlight';
import { CartContext } from '../context/CartContext';
import './ItemList.css';

function ItemList() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpenArtist, setDrawerOpenArtist] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/items/')
      .then((response) => {
        const fetchedItems = response.data;
        setFilteredItems(fetchedItems);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const fetchArtistData = (artistId) => {
    axios
      .get(`http://127.0.0.1:8000/api/artists/${artistId}/`)
      .then((response) => {
        setSelectedArtist(response.data);
      })
      .catch((error) => {
        console.error('Error fetching artist:', error);
        setSelectedArtist(null);
      });
  };

  const handleDrawerOpenArtist = () => {
    if (selectedItem && selectedItem.artist && selectedItem.artist.id) {
      fetchArtistData(selectedItem.artist.id);
      setDrawerOpenArtist(true);
    }
  };

  const handleDrawerCloseArtist = () => {
    setDrawerOpenArtist(false);
    setSelectedArtist(null);
  };

  return (
    <div className="item-list-container">
      <Spotlight />
      <div className="scrollable-container">
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
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedItem?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={selectedItem?.image}
                alt="Selected"
                className="modal-image"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className="modal-title">
                {selectedItem?.title}
              </Typography>
              <Typography variant="body1" className="modal-description">
                {selectedItem?.description}
              </Typography>
              <audio controls className="modal-audio">
                <source
                  src={selectedItem?.audio_description}
                  type="audio/mpeg"
                />
              </audio>
              <DialogActions className="modal-actions">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => addToCart(selectedItem)}
                >
                  Add to Cart
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleDrawerOpenArtist}
                >
                  Know the Artist
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        anchor="right"
        open={drawerOpenArtist}
        onClose={handleDrawerCloseArtist}
        PaperProps={{ style: { padding: '20px', height: '50%' } }}
      >
        {selectedArtist ? (
          <div>
            <Typography variant="h4">{selectedArtist.name}</Typography>
            <img
              src={selectedArtist.foto}
              alt={selectedArtist.name}
              style={{ width: '40%', height: 'auto', marginTop: '20px' }}
            />
            <Typography variant="body1" style={{ marginTop: '20px' }}>
              {selectedArtist.biography}
            </Typography>
          </div>
        ) : (
          <Typography variant="h6">No artist data available</Typography>
        )}
      </Dialog>
    </div>
  );
}

export default ItemList;
