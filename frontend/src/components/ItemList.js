import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { CartContext } from '../context/CartContext';
import SearchBar from './SearchBar'; // Import the SearchBar component
import Button from '@mui/joy/Button';

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state
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

  useEffect(() => {
    let sortedItems = [...items];
    if (sortOption === 'category') {
      sortedItems.sort((a, b) => {
        const categoryA =
          typeof a.category === 'string' ? a.category.toLowerCase() : '';
        const categoryB =
          typeof b.category === 'string' ? b.category.toLowerCase() : '';
        return categoryA.localeCompare(categoryB);
      });
    } else if (sortOption === 'artist') {
      sortedItems.sort((a, b) => {
        const artistA =
          typeof a.artist === 'string' ? a.artist.toLowerCase() : '';
        const artistB =
          typeof b.artist === 'string' ? b.artist.toLowerCase() : '';
        return artistA.localeCompare(artistB);
      });
    }

    // Filter items based on search query
    const searchedItems = sortedItems.filter(
      (item) =>
        (typeof item.title === 'string' &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof item.category === 'string' &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof item.artist === 'string' &&
          item.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredItems(searchedItems);
  }, [items, sortOption, searchQuery]);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FormControl sx={{ mb: 1, minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="artist">Artist</MenuItem>
        </Select>
      </FormControl>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        style={{ marginBottom: '20px' }} // Add margin to separate from cards
      />

      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {filteredItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={item.id}
            sx={{ height: '100%', display: 'inblock', padding: '8px' }} // Adjust padding
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                maxWidth: '280px', // Adjusted size
                margin: 'auto',
              }}
            >
              <CardMedia
                component="img"
                height="250" // Adjusted height
                image={item.image}
                title={item.title}
                onClick={() => handleClickOpen(item)}
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
                    color: 'port',
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
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
        <DialogContent>
          <img
            src={selectedItem?.image}
            alt="Selected"
            style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
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
