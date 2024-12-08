import { Typography, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'grey.800' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" passHref>
          <Typography variant="h6" sx={{ cursor: 'pointer', color: 'white' }}>
            DeepSkill
          </Typography>
        </Link>
        <Link href="/program/new-program" passHref>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer', textAlign: 'right', color: 'white' }}
          >
            Logout
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
