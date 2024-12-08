import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/programs?populate=modules')
      .then((response) => {
        setPrograms(response.data.data);
      })
      .catch(() => alert('Failed to fetch programs'));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Programs</Typography>
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
    </Box>
  );
};

export default Home;
