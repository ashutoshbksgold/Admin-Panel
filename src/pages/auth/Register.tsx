import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import AuthorizationDetails from './register/AuthorizationDetails';
import { useEffect, useState } from 'react';
import LoadingScreen from 'src/components/LoadingScreen';
import { postApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';

// ----------------------------------------------------------------------

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
  padding: theme.spacing(8, 0),
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gstData, setGstData] = useState(null);
  const smUp = useResponsive('up', 'sm');

  const handleGSTDetails = async (gstNumber: string) => {
    const res = await postApi({
      url: RegisterApi.getGstDetails,
      values: { gstNo: gstNumber },
      showToast: true,
    });

    if (res.data) {
      setGstData(res.data);
    }
    console.log(res.data);
    // {
    //   "clientId": "gst_otp_rrxuyvMzdyPlNxmubrJh",
    //   "gstinStatus": "Active",
    //   "gstNo": "09DCFPS9138M1ZP",
    //   "companyType": "Proprietorship",
    //   "legalName": "SEEMA",
    //   "businessName": "OneOBit Consultancy",
    //   "mobile": "xxxxxx1773",
    //   "email": "sxxxxx@gmail.com"
    // }
  };

  const mdUp = useResponsive('up', 'md');

  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    if (user) {
      if (!Object.values(user.modules).some((obj: any) => obj.isOpted)) {
        navigate(PATH_AUTH.moduleSelect);
      }
      if (!user.isGstVerified) {
        navigate(PATH_AUTH.verifyGst);
      }
      if (user.documentStatus === 'not_uploaded') {
        navigate(PATH_AUTH.uploadDocument);
      }
    }
  }, [user]);

  return (
    <Page title="Register">
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
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
              {/* <SelectModule /> */}

              {/* <GSTNumber /> */}
              {/* <ConfirmGstDetails /> */}
              {/* <GstVerify /> */}
              {/* <DocumentUpload /> */}

              <AuthorizationDetails />

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
      )}
    </Page>
  );
}
