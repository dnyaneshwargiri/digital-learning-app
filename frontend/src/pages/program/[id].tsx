// src/pages/programs/[id].tsx
import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid2,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { ProgramDetailsProps } from '@/app/types/ProgramDetailsProps';
import axiosInstance from '@/api/axios';
import styles from './program-details.module.css';

const ProgramDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [program, setProgram] = useState<null | ProgramDetailsProps['program']>(
    null
  );

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/programs?where[id]=${id}&populate=modules`)
        .then((response) => {
          setProgram(response.data.data[0]);
        })
        .catch((error) => {
          console.error('Failed to fetch program details:', error);
          setProgram(null);
        });
    }
  }, [id]);

  if (!program) {
    return <Typography variant="h5">Program not found</Typography>;
  }

  return (
    <Paper className={styles.paper}>
      <Typography variant="h4" gutterBottom>
        {program.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {program.content}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Modules:
      </Typography>
      <Grid2 container spacing={2}>
        {program.modules.map((module, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h6">{module.title}</Typography>
                <Typography variant="body2">{module.description}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
        className={styles.backButton}
      >
        Back to Home
      </Button>
    </Paper>
  );
};

export default ProgramDetails;
