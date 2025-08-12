import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, user_type: userType }),
      });
      
      if (response.ok) {
        setToast({ open: true, message: 'Registration successful! Please sign in.', severity: 'success' });
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        const errorData = await response.json();
        setToast({ open: true, message: errorData.detail || 'Registration failed', severity: 'error' });
      }
    } catch (error) {
      setToast({ open: true, message: 'Registration failed', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel>User Type</InputLabel>
            <Select
              value={userType}
              label="User Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="tenant">Tenant</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
      <Toast 
        open={toast.open} 
        message={toast.message} 
        severity={toast.severity} 
        onClose={() => setToast({ ...toast, open: false })} 
      />
    </Container>
  );
};

export default SignUpPage;