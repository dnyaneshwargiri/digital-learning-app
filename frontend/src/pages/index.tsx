import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid2,
} from '@mui/material';
import Link from 'next/link';
import { Program } from '@/app/types/Program';
import axiosInstance from '@/api/axios';
import AppSnackbar from '@/app/common/snackbar';
import withAuth from '@/app/utils/guards/with-auth';

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
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Programs</Typography>
        <Link href="/program/new-program" passHref>
          <Button variant="contained" color="primary">
            Add New Program
          </Button>
        </Link>
      </Box>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {programs.map((program) => (
          <Grid2 item xs={12} sm={6} md={4} key={program.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{program.title}</Typography>
                <Typography variant="body2">
                  {program.content.slice(0, 30)}...
                </Typography>
                <Typography variant="body2">
                  Modules: {program.modules.length}
                </Typography>
                <Link href={`/program/${program.id}`} passHref>
                  <Button variant="contained" color="primary">
                    View Program
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
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
