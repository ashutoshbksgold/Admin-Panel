import { Card, Typography, TextField, Button, Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { postApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';
import LoadingScreen from 'src/components/LoadingScreen';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useResponsive from 'src/hooks/useResponsive';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_AUTH } from 'src/routes/paths';
import useAuth from 'src/hooks/useAuth';
import GSTNumberForm from './GSTNumberForm';
import ConfirmGstDetails from './ConfirmGstDetails';
import GstVerify from './GstVerify';
import Image from 'src/components/Image';

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
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(8, 0),
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

type GstDetailType = {
  clientId: string;
  gstinStatus: string;
  gstNo: string;
  companyType: string;
  legalName: string;
  businessName: string;
  mobile: string;
  email: string;
};

const GSTNumber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const [gstDetails, setGstDetails] = useState<GstDetailType>();
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.isGstVerified) {
      navigate(PATH_AUTH.uploadDocument);
    }
  }, [user]);

  //Get GST details
  const handleGSTSubmit = async (values: any) => {
    //TODO: Need to enable
    setIsLoading(true);
    const res = await postApi({
      url: RegisterApi.getGstDetails,
      values,
      showToast: true,
    });
    setIsLoading(false);

    if (!res || res.errors) {
      return;
    }
    setGstDetails(res.data);

    // setGstDetails({
    //   clientId: 'gst_otp_rrxuyvMzdyPlNxmubrJh',
    //   gstinStatus: 'Active',
    //   gstNo: '09DCFPS9138M1ZP',
    //   companyType: 'Proprietorship',
    //   legalName: 'SEEMA',
    //   businessName: 'OneOBit Consultancy',
    //   mobile: 'xxxxxx1773',
    //   email: 'sxxxxx@gmail.com',
    // });
  };

  // Sent Otp
  const sendGstOtp = async (clientId: string) => {
    console.log('log: sendgst code');
    setIsLoading(true);
    //TODO: need to enable
    const res = await postApi({
      url: RegisterApi.sendGstOtp,
      values: { clientId },
      showToast: true,
    });
    setIsLoading(false);
    if (res.data.otp_sent) {
      setVerify(true);
    }
    //MOCK_REQUEST
    setIsLoading(false);
    setVerify(true);

    // {
    //     "otp_sent": true
    // }
    //response
  };

  // Verify OTP and navigate to document Upload
  const verifyGstOtp = async (values: any) => {
    const otp = values.code1 + values.code2 + values.code3 + values.code4;
    const res = await postApi({
      url: RegisterApi.verifyGstOtp,
      values: { clientId: gstDetails?.clientId, otp: otp },
      showToast: true,
    });

    if (!res || res.errors) {
      return;
    }
    navigate(PATH_AUTH.uploadDocument);
  };

  return (
    <Page title="GST Details">
      {isLoading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <RootStyle>
          <HeaderStyle>
            <Logo />
            {/* {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Already have an account? {''}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                  Login
                </Link>
              </Typography>
            )} */}
          </HeaderStyle>
          <Container>
            <ContentStyle>
              {gstDetails && verify ? (
                <GstVerify verifyGstOtp={verifyGstOtp} isLoading={isLoading} />
              ) : gstDetails ? (
                <ConfirmGstDetails gstData={gstDetails} sendGstOtp={sendGstOtp} />
              ) : (
                <GSTNumberForm handleGSTSubmit={handleGSTSubmit} />
              )}
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

          {mdUp && (!gstDetails || verify) && (
            <SectionStyle>
              <Typography variant="h3" color="primary" sx={{ px: 5, mt: 10, mb: 5 }}>
                Verify GST Number!
              </Typography>
              <Image
                maxWidth={650}
                margin="auto"
                visibleByDefault
                disabledEffect
                src="/assets/illustrations/illustration-verify.svg"
                alt="login"
              />
              <Typography variant="subtitle1" color="primary.light" p={5}>
                Your privacy is important to us. At MyGold, We follow a few fundamental principles:
                We don’t ask you for personally identifiable information and We don’t share your
                information with third parties. If you have any questions or concerns about this
                policy, please reach out to us at
              </Typography>
            </SectionStyle>
          )}
        </RootStyle>
      )}
    </Page>
  );
};

export default GSTNumber;
