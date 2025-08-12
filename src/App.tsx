import React, { useState } from 'react';
import { Button, Container, Typography, Alert, Box } from '@mui/material';

interface HealthStatus {
  status: string;
  message: string;
}

function App() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      const data = await response.json();
      setHealthStatus(data);
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Health Check App
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={checkHealth}
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? 'Checking...' : 'Check Backend Health'}
        </Button>
        
        {healthStatus && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Status: {healthStatus.status} - {healthStatus.message}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default App;
