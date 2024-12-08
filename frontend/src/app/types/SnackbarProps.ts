export interface SnackbarProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}
