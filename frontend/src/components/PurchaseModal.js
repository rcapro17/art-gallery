import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function PurchaseModal({ open, onClose, onConfirm }) {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Example: Fetch or calculate subtotal and total
    // Here we just use static values for demonstration
    setSubtotal(100);
    setTotal(120);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Purchase Summary</DialogTitle>
      <DialogContent>
        <Typography>Subtotal: ${(subtotal ?? 0).toFixed(2)}</Typography>
        <Typography>Total: ${(total ?? 0).toFixed(2)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseModal;
