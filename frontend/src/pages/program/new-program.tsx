import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axiosInstance from '@/api/axios';

const NewProgram = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modules, setModules] = useState([{ title: '', description: '' }]);
  const router = useRouter();

  const handleAddModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const handleModuleChange = (index: number, key: string, value: string) => {
    const updatedModules = modules.map((module, i) =>
      i === index ? { ...module, [key]: value } : module
    );
    setModules(updatedModules);
  };

  const handleSubmit = async () => {
    try {
      const newProgram = {
        title,
        content,
        modules,
      };
      await axiosInstance.post('/programs', newProgram);
      router.push('/');
    } catch (error) {
      console.error('Failed to create new program:', error);
      alert('Failed to create new program');
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
          <TextField
            fullWidth
            label="Module Title"
            value={module.title}
            onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Module Description"
            value={module.description}
            onChange={(e) =>
              handleModuleChange(index, 'description', e.target.value)
            }
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default NewProgram;
