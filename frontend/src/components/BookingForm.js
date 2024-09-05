import React, { useState } from 'react';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(bookingDate).toISOString().split('T')[0];
    const formattedTime = bookingTime.toISOString().split('T')[1].slice(0, 5);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          booking_date: formattedDate,
          booking_time: formattedTime,
          message,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Visita Agendada com sucesso!!!');
        setName('');
        setEmail('');
        setBookingDate(null);
        setBookingTime(null);
        setMessage('');
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = await response.text();
        }
        console.error('Error creating booking:', errorData);
        setSuccessMessage('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setSuccessMessage('Failed to create booking.');
    }
  };

  return (
    <Paper className="booking-form-container">
      <Typography variant="h5" component="h1" className="booking-form-title">
        Agende Sua Visita na Galeria
      </Typography>
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box className="booking-form-field">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box className="booking-form-field">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box className="booking-form-field">
            <DesktopDatePicker
              label="Booking Date"
              inputFormat="MM/dd/yyyy"
              value={bookingDate}
              onChange={(newValue) => setBookingDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Box>
          <Box className="booking-form-field">
            <TimePicker
              label="Booking Time"
              value={bookingTime}
              onChange={(newValue) => setBookingTime(newValue)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Box>
          <Box className="booking-form-field">
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="booking-form-button"
          >
            Submit
          </Button>
          {successMessage && (
            <Typography
              variant="body1"
              color="success.main"
              className="booking-form-message"
            >
              {successMessage}
            </Typography>
          )}
        </LocalizationProvider>
      </form>
    </Paper>
  );
};

export default BookingForm;
