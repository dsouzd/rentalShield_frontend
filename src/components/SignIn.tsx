import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import Toast from './Toast';

interface SignInProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignIn: React.FC<SignInProps> = ({ open, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setToast({ open: true, message: 'Login successful!', severity: 'success' });
        onClose();
        onSuccess();
      } else {
        setToast({ open: true, message: 'Invalid credentials', severity: 'error' });
      }
    } catch (error) {
      setToast({ open: true, message: 'Login failed', severity: 'error' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Toast 
        open={toast.open} 
        message={toast.message} 
        severity={toast.severity} 
        onClose={() => setToast({ ...toast, open: false })} 
      />
    </>
  );
};

export default SignIn;