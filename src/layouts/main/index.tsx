import { useLocation, Outlet, useNavigate } from 'react-router-dom';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import Login from 'src/pages/auth/Login';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === '/';

  if (isHome) {
    return navigate('/dashboard');
  }

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? <MainFooter /> : ''}
    </Stack>
  );
}
