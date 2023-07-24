// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Card } from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
// components
import Page from 'src/components/Page';
// sections
import { VerifyCodeForm } from 'src/sections/auth/verify-code';

// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  maxWidth: 510,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2, 0, 8, 2),
}));

// ----------------------------------------------------------------------

export default function GstVerify({ verifyGstOtp, isLoading }: any) {
  return (
    <Page title="Verify Code">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Please check your phone!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We have send a 4-digit confirmation code , please enter the code in below box to verify
            your GST information.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm onSubmit={verifyGstOtp} isLoading={isLoading} />
          </Box>

          <Typography variant="body2">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" onClick={() => {}}>
              Resend code
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
