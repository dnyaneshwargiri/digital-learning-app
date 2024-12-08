import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import AppSnackbar from '@/app/common/snackbar';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'error'
  );

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_AUTH as string,
        {
          identifier: email,
          password,
        }
      );
      localStorage.setItem('jwtToken', response.data.jwt);
      router.push('/');
    } catch (error) {
      setSnackbarMessage('Login failed');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
      <AppSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Login;
