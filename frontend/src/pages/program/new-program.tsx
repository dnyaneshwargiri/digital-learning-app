import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from '@/api/axios';

const NewProgram = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modules, setModules] = useState([{ title: '', description: '' }]);
  const [availableModules, setAvailableModules] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch available modules from Strapi
    axiosInstance
      .get('/modules')
      .then((response) => {
        setAvailableModules(response.data.data);
      })
      .catch(() => alert('Failed to fetch available modules'));
  }, []);

  const handleAddModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const handleModuleChange = (index: number, key: string, value: string) => {
    let newDescription = '';
    if (key === 'title') {
      const selectedModule = availableModules.find(
        (mod) => mod.title === value
      );
      if (selectedModule) {
        newDescription = selectedModule.description;
      }
    }

    const updatedModules = modules.map((module, i) =>
      i === index
        ? { ...module, [key]: value, description: newDescription }
        : module
    );
    setModules(updatedModules);
  };

  const handleSubmit = async () => {
    try {
      const newProgram = {
        title,
        content,
      };
      const payload = { data: newProgram };
      await axiosInstance.post('/programs', payload);
      setSnackbarSeverity('success');
      setSnackbarMessage('Program created successfully!');
    } catch (error) {
      console.error('Failed to create new program:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create new program');
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    if (snackbarSeverity === 'success') {
      router.push('/');
    }
  };

  return (
    <Paper sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Program
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6">Modules:</Typography>
      {modules.map((module, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Select
            fullWidth
            value={module.title}
            onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
            displayEmpty
            sx={{ mb: 1 }}
          >
            <MenuItem value="" disabled>
              Select a module
            </MenuItem>
            {availableModules.map((mod) => (
              <MenuItem key={mod.id} value={mod.title}>
                {mod.title}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Module Description"
            value={module.description}
            disabled
            sx={{ mb: 1 }}
          />
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddModule}
        sx={{ mb: 2 }}
      >
        Add Module
      </Button>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NewProgram;
