import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

interface UserProfile {
  unique_id: string;
  name: string;
  email: string;
  user_type: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      
      try {
        const response = await fetch(`${BACKEND_URL}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      
      {profile && (
        <Card>
          <CardContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Typography sx={{ mb: 1 }}><strong>Name:</strong> {profile.name}</Typography>
              <Typography sx={{ mb: 1 }}><strong>Email:</strong> {profile.email}</Typography>
              <Typography sx={{ mb: 1 }}><strong>User Type:</strong> {profile.user_type}</Typography>
              <Typography sx={{ mb: 1 }}><strong>Unique ID:</strong> {profile.unique_id}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProfilePage;