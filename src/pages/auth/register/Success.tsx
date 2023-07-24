import { Icon } from '@iconify/react';
import { Box, Button, Card, MenuItem, TextField, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import LoadingScreen from 'src/components/LoadingScreen';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useResponsive from 'src/hooks/useResponsive';
import { PATH_AUTH } from 'src/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';
import Image from 'src/components/Image';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '2px solid',
  borderColor: 'primary',
  minWidth: 180,
  textAlign: 'center',
  cursor: 'pointer',
}));

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  background: 'linear-gradient(to bottom, #541338,#050C5A)',
  minHeight: '100vh',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center ',
  padding: theme.spacing(8, 0),
}));

const Success = () => {
  const [loading, setLoading] = useState(false);
  const smUp = useResponsive('up', 'sm');
  const [uploadDocument, setUploadDocument] = useState<any>([]);
  const navigate = useNavigate();

  return (
    <Page title="Upload Document">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>
        <Container>
          <ContentStyle>
            <Card sx={{ px: 6, py: 5, maxWidth: 660, width: '100%' }}>
              <Image
                maxWidth={650}
                margin="auto"
                visibleByDefault
                disabledEffect
                src="/assets/illustrations/illustration_thankyou.svg"
                alt="login"
              />

              <Typography textAlign="center" color="primary.light" variant="subtitle1">
                {' '}
                We have saved your details and shall notify you
                <br />
                once your account has been activated.
              </Typography>
            </Card>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default Success;
