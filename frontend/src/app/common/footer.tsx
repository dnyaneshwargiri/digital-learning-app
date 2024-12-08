import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        textAlign: 'center',
        backgroundColor: 'grey.800',
        color: 'white',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} DeepSkill GmbH
      </Typography>
    </Box>
  );
};

export default Footer;
