import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
//hooks
import useResponsive from '../../hooks/useResponsive';
import useAuth from 'src/hooks/useAuth';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
import { VerifyCodeForm } from 'src/sections/auth/verify-code';
// sections
import { LoginForm } from '../../sections/auth/login';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  background: 'linear-gradient(to bottom, #541338,#050C5A)',
  minHeight: '100vh',
  margin: 'auto',
  alignItems: 'center',
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '70%',

  padding: theme.spacing(4, 8),
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '90vh',
  justifyContent: 'center',
  padding: theme.spacing(8, 4),
  backgroundColor: theme.palette.primary.lighter,
}));

type FormValuesProps = {
  mobile: string;
  afterSubmit?: string;
};
type VerifyOtpProp = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, isOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const smUp = useResponsive('up', 'sm');
  const device_id = uuid().slice(0, 8);

  const mdUp = useResponsive('up', 'md');

  const verifyOtp = async (values: VerifyOtpProp) => {
    setIsLoading(true);
    const otp = values.code1 + values.code2 + values.code3 + values.code4;

    let deviceId = device_id;
    //await verify otp
    setIsLoading(false);
    console.log('log: values', otp);
  };

  return (
    <Page title="Admin Login">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Box>
              <Box color="primary" sx={{ my: 7 }}>
                <Logo sx={{ height: 150, width: 150 }} height={150} width={150} />

                <Typography color="primary" fontWeight={700} variant="h5">
                  Your system is protected{' '}
                </Typography>
                <Typography color="primary" variant="body2">
                  With MFA, Please enter MFA using <br />
                  <Link
                    variant="h5"
                    color="primary"
                    underline="none"
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 400,
                      '&:hover': {
                        fontWeight: 'bolder',
                      },
                    }}
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN&gl=US"
                  >
                    Google Authenticator
                  </Link>
                </Typography>
              </Box>

              <VerifyCodeForm onSubmit={verifyOtp} isLoading={isLoading} />
            </Box>

            {mdUp && (
              <SectionStyle>
                <Typography variant="h3" color="primary">
                  The all-in-one Platform for Managing MyGold Eco-System
                </Typography>
                <Typography variant="h5" color="primary.light" mt={2}>
                  <Icon icon="mdi:success-circle" />
                  Powerful and intuitive suite of gold eco-system.
                </Typography>
                <Typography variant="h5" color="primary.light">
                  <Icon icon="mdi:success-circle" /> Manage Master Data of Entire Ecosystem.
                </Typography>
                <Typography variant="h5" color="primary.light">
                  {' '}
                  <Icon icon="mdi:success-circle" /> Manage Merchants.
                </Typography>
                <Typography variant="h5" color="primary.light">
                  {' '}
                  <Icon icon="mdi:success-circle" /> Customer Relation Management.{' '}
                </Typography>{' '}
                <Typography variant="h5" color="primary.light">
                  {' '}
                  <Icon icon="mdi:success-circle" /> Settlement Management
                </Typography>
                <Typography variant="subtitle2" pt={5} color="primary.light">
                  Your privacy is important to us. At MyGold, We follow a few fundamental
                  principles: We don’t ask you for personally identifiable information and We don’t
                  share your information with third parties. If you have any questions or concerns
                  about this policy, please reach out to us at admin@bksmygold.com.
                </Typography>
              </SectionStyle>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
