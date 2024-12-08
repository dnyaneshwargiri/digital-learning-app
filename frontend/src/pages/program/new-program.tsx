import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

const NewProgram = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL as string}/modules`)
      .then((response) => setModules(response.data))
      .catch(() => alert('Failed to fetch modules'));
  }, []);

  const handleSubmit = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('You must log in first!');
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URLL as string}/programs`,
        { title, content, modules: selectedModules },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )
      .then(() => router.push('/'))
      .catch(() => alert('Failed to create program'));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">New Program</Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Modules</InputLabel>
          <Select
            multiple
            value={selectedModules}
            onChange={(e) => setSelectedModules(e.target.value)}
          >
            {modules.map((module) => (
              <MenuItem key={module.id} value={module.id}>
                {module.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewProgram;
