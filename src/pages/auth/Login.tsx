import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
//hooks
import useResponsive from "../../hooks/useResponsive";
import useAuth from "src/hooks/useAuth";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
import { VerifyCodeForm } from "src/sections/auth/verify-code";
// sections
import { LoginForm } from "../../sections/auth/login";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  background: "linear-gradient(to bottom, #541338,#050C5A)",
  minHeight: "100vh",
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "50%",
  maxHeight: "95vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  minHeight: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(8, 0),
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
  const [mobileNumber, setMobileNumber] = useState("");
  const smUp = useResponsive("up", "sm");
  const device_id = uuid().slice(0, 8);

  const mdUp = useResponsive("up", "md");

  const sendMobileOtp = async (values: FormValuesProps) => {
    setIsLoading(true);
    //send otp
    let res = "";
    setMobileNumber(values.mobile);
    if (res) {
      isOtpSent(true);
      localStorage.setItem("otp_sent", "otp_sent");
    }
    setIsLoading(false);
    return "";
  };

  const verifyOtp = async (values: VerifyOtpProp) => {
    setIsLoading(true);
    const otp = values.code1 + values.code2 + values.code3 + values.code4;

    let deviceId = device_id;
    //await verify otp
    setIsLoading(false);
    console.log("log: values", otp);
  };

  return (
    <Page title="Admin Login">
      <RootStyle>
        <HeaderStyle>{otpSent && <Logo />}</HeaderStyle>

        <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center" }}>
          <ContentStyle>
            <Box textAlign="center">
              {otpSent ? (
                <>
                  <Typography variant="h3" color="primary.light">
                    Please check your phone!
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }} px={3} mb={2}>
                    We have send a 4-digit confirmation code , please enter the
                    code to verify your Identity.
                  </Typography>
                </>
              ) : (
                <Logo
                  sx={{ height: 160, width: 160 }}
                  height={160}
                  width={160}
                />
              )}
            </Box>

            {otpSent ? (
              <VerifyCodeForm onSubmit={verifyOtp} isLoading={isLoading} />
            ) : (
              <LoginForm
                mobileNumberSubmit={sendMobileOtp}
                isLoading={isLoading}
              />
            )}
            {otpSent && (
              <Typography variant="body2" mt={3}>
                Don’t have a code? &nbsp;
                <Link variant="subtitle2" onClick={() => {}}>
                  Resend code
                </Link>
              </Typography>
            )}
            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to={PATH_AUTH.register}
                >
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" color="primary" sx={{ px: 5, my: 3 }}>
              Hi, Welcome Back in BKS My Gold
            </Typography>
            <Image
              maxWidth={650}
              margin="auto"
              visibleByDefault
              disabledEffect
              src="/assets/illustrations/illustration_login.svg"
              alt="login"
            />
            <Typography variant="subtitle2" p={5} color="primary.light">
              Your privacy is important to us. At MyGold, We follow a few
              fundamental principles: We don’t ask you for personally
              identifiable information and We don’t share your information with
              third parties. If you have any questions or concerns about this
              policy, please reach out to us at admin@bksmygold.com.
            </Typography>
          </SectionStyle>
        )}
      </RootStyle>
    </Page>
  );
}
