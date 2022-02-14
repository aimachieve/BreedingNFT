import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Container, Button, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        // <MainFooter />
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent={'space-between'} alignItems="center">
              <ScrollLink to="move_top" spy smooth>
                <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
              </ScrollLink>
              <Stack direction="row" spacing={1}>
                <Button variant="text"> Privacy Policy </Button>
                <Button variant="text"> Terms of Service </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent={'space-between'} alignItems="center">
              <ScrollLink to="move_top" spy smooth>
                <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
              </ScrollLink>
              <Stack direction="row" spacing={1}>
                <Button variant="text"> Privacy Policy </Button>
                <Button variant="text"> Terms of Service </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}
