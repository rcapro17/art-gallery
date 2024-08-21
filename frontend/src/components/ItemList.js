import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/items/')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const addToCart = (item) => {
    // Implement add to cart functionality
  };

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <div>
      {items.map((item) => (
        <Card key={item.id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            title={item.title}
            onClick={() => handleClickOpen(item)}
            sx={{ cursor: 'pointer', objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncateDescription(item.description)}
            </Typography>
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={() => handleClickOpen(item)}
            >
              {item.description.length > 100 ? 'Expand' : ''}
            </Button>
            <Typography variant="h6" component="div">
              ${item.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      ))}

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
        <DialogContent>
          <img
            src={selectedItem?.image}
            alt="Selected"
            style={{ width: '100%', marginBottom: '16px' }}
          />
          <Typography variant="body1" color="text.secondary" paragraph>
            {selectedItem?.description}
          </Typography>
          <audio controls>
            <source src={selectedItem?.audio_description} type="audio/mpeg" />
          </audio>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ItemList;
