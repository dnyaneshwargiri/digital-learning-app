import { Snackbar, Alert } from '@mui/material';
import { SnackbarProps } from '../types/SnackbarProps';

const AppSnackbar = ({
  open,
  severity,
  message,
  onClose,
  autoHideDuration = 6000,
}: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
