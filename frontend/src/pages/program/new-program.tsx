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
  FormControl,
  FormHelperText,
} from '@mui/material';
import axiosInstance from '@/api/axios';
import { Module } from '@/app/types/Program';
import AppSnackbar from '@/app/common/snackbar';
import withAuth from '@/app/utils/guards/with-auth';

const NewProgram = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modules, setModules] = useState([
    { title: '', description: '', documentId: '' },
  ]);
  const [availableModules, setAvailableModules] = useState<Module[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/modules')
      .then((response) => {
        setAvailableModules(response.data.data);
      })
      .catch(() => {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to fetch available modules');
        setSnackbarOpen(true);
      });
  }, []);

  const handleAddModule = () => {
    setModules([...modules, { title: '', description: '', documentId: '' }]);
  };

  const handleModuleChange = (index: number, key: string, value: string) => {
    let newDescription = '';
    let documentId = '';
    if (key === 'title') {
      const selectedModule = availableModules.find(
        (mod: Module) => mod.title === value
      );
      if (selectedModule) {
        newDescription = selectedModule.description;
        documentId = selectedModule.documentId || '';
      }
    }

    const updatedModules = modules.map((module, i) =>
      i === index
        ? {
            ...module,
            [key]: value,
            description: newDescription,
            documentId,
          }
        : module
    );
    setModules(updatedModules);
  };

  const isModuleSelected = (moduleTitle: string): boolean => {
    return (
      modules.some((mod) => mod.title === moduleTitle) && moduleTitle !== ''
    );
  };

  const validateFields = () => {
    let isValid = true;

    if (title.trim() === '') {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (content.trim() === '') {
      setContentError(true);
      isValid = false;
    } else {
      setContentError(false);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const newProgram = {
        title,
        content,
      };
      const programResponse = await axiosInstance.post('/programs', {
        data: newProgram,
      });

      const moduleIds = modules.map((module) => module.documentId);

      const connectPayload = {
        data: {
          modules: {
            connect: moduleIds,
          },
        },
      };
      await axiosInstance.put(
        `/programs/${programResponse.data.data.documentId}`,
        connectPayload
      );

      setSnackbarSeverity('success');
      setSnackbarMessage('Program created and modules added successfully!');
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
    <Paper
      sx={{
        padding: 2,
        maxWidth: 600,
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Program
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }} error={titleError}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {titleError && <FormHelperText>Title is required</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }} error={contentError}>
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {contentError && <FormHelperText>Content is required</FormHelperText>}
      </FormControl>
      <Typography variant="h6">Modules</Typography>
      {modules.map((module, index) => (
        <Box key={index} sx={{ mb: 2, width: '100%' }}>
          <Select
            fullWidth
            value={module.title}
            onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
            displayEmpty
            sx={{ mb: 1 }}
            disabled={isModuleSelected(module.title)}
          >
            <MenuItem value="" disabled>
              Select a module
            </MenuItem>
            {availableModules.map((mod: Module) => (
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
        variant="text"
        color="info"
        onClick={handleAddModule}
        sx={{ mb: 2 }}
      >
        Add Module
      </Button>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Button
          variant="outlined"
          color="error"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <AppSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Paper>
  );
};

export default withAuth(NewProgram);
