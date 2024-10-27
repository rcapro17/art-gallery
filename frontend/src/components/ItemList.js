import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
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
import SortItem from './SortItem';
import './ItemList.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/items/')
      .then((response) => {
        const fetchedItems = response.data;
        setItems(fetchedItems);
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

  return (
    <div className="item-list-container">
      <Spotlight />
      <SortItem items={items} setFilteredItems={setFilteredItems} />
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
              <a href="#" className="products-box mb-30">
                <figure>
                  <CardMedia
                    component="img"
                    height="207"
                    image={item.image}
                    title={item.title}
                    onClick={() => handleClickOpen(item)}
                    className="card-media"
                  />
                </figure>
                <h3 className="products-box__title">
                  {item.title} <span className="icon-arrow-long-right"></span>
                </h3>
                <div className="products-box__cat">{item.artist.name}</div>

                <CardActions className="card-actions">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </a>
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
                  // onClick={handleDrawerOpenArtist}
                >
                  Know the artist
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ItemList;
