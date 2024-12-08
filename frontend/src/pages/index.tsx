import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { Program } from '@/app/types/Program';
import axiosInstance from '@/api/axios';
import AppSnackbar from '@/app/common/snackbar';
import withAuth from '@/app/utils/guards/with-auth';
import ProgramCard from './program/program-card';

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'error'
  );

  useEffect(() => {
    axiosInstance
      .get('/programs?populate=modules')
      .then((response) => {
        setPrograms(response.data.data);
      })
      .catch(() => {
        setSnackbarMessage('Failed to fetch programs');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="h4">Programs</Typography>
        <Link href="/program/new-program" passHref>
          <Button variant="outlined" color="primary">
            Add New Program
          </Button>
        </Link>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {programs.map((program) => (
          <Grid item xs={12} sm={6} md={4} key={program.id}>
            <ProgramCard program={program} />{' '}
          </Grid>
        ))}
      </Grid>
      <AppSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default withAuth(Home);
