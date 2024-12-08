// Home.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { Program } from '@/app/types/Program';

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL as string}/programs`)
      .then((response) => setPrograms(response.data))
      .catch(() => alert('Failed to fetch programs'));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Programs</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {programs.map((program) => (
          <Grid item xs={12} sm={6} md={4} key={program.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{program.title}</Typography>
                <Typography variant="body2">
                  {program.description.slice(0, 30)}...
                </Typography>
                <Typography variant="body2">
                  Modules: {program.modules.length}
                </Typography>
                <Link href={`/programs/${program.id}`} passHref>
                  <Button variant="contained" color="primary">
                    View Program
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
