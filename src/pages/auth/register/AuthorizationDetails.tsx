import React, { useState } from 'react';
import { Card, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/lab';
import * as Yup from 'yup';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router';
import { VerifyCodeForm } from 'src/sections/auth/verify-code';
import { PATH_AUTH } from 'src/routes/paths';
import { Link } from '@mui/material';
import MerchantAddress from './MerchantAddress';
import { toast } from 'react-hot-toast';
import { postApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';

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

interface AuthorizationDetailsProps {
  email: string;
  authorizedPerson: {
    name: string;
    dob: string;
    mobile: string;
    designation: string;
  };
}

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AuthorizationDetails: React.FC = () => {
  const [authDetails, setAuthDetails] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues: AuthorizationDetailsProps = {
    email: '',
    authorizedPerson: {
      name: '',
      dob: '',
      mobile: '',
      designation: '',
    },
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    authorizedPerson: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      dob: Yup.string().required('Date of Birth is required'),
      mobile: Yup.string().required('Mobile number is required'),
      designation: Yup.string().required('Designation is required'),
    }),
  });

  //submit form and send otp
  const handleSubmit = (values: AuthorizationDetailsProps) => {
    // Handle form submission here
    console.log(values);
    setAuthDetails({
      ...values,
      dob: values.authorizedPerson.dob.slice(0, 10),
    });
  };

  const handleDateChange = (
    name: string,
    date: Date | null,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) => {
    setFieldValue(name, formatDate(date ? date : new Date()));
  };

  const addressSubmit = async (fullAddress: string, values: any) => {
    console.log(values);

    const res = await postApi({
      url: RegisterApi.base,
      values: {
        ...authDetails,
        ...values,
        address: fullAddress,
      },
      showToast: true,
    });

    if (!res || res.errors) {
      return;
    }
    navigate(PATH_AUTH.thankyou);
  };

  return (
    <Page title="Authorization Signatory Details">
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
            <Card sx={{ px: 6, py: 5, maxWidth: 660 }}>
              {authDetails ? (
                <Box textAlign="center">
                  <MerchantAddress addressSubmit={addressSubmit} />
                </Box>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                      <Box marginBottom={2}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Enter Business Email"
                          type="email"
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          fullWidth
                        />
                      </Box>

                      <Box>
                        <Typography variant="h5" color="primary" mb={2}>
                          Authorised Signatory Details
                        </Typography>
                      </Box>

                      <Box marginBottom={2}>
                        <Field
                          as={TextField}
                          name="authorizedPerson.name"
                          label="Full Name"
                          error={touched.authorizedPerson?.name && !!errors.authorizedPerson?.name}
                          helperText={
                            touched.authorizedPerson?.name && errors.authorizedPerson?.name
                          }
                          fullWidth
                        />
                      </Box>

                      <Box marginBottom={2}>
                        <Field
                          as={TextField}
                          name="authorizedPerson.designation"
                          label="Designation"
                          error={
                            touched.authorizedPerson?.designation &&
                            !!errors.authorizedPerson?.designation
                          }
                          helperText={
                            touched.authorizedPerson?.designation &&
                            errors.authorizedPerson?.designation
                          }
                          fullWidth
                        />
                      </Box>
                      <Box marginBottom={2} display="flex" justifyContent="space-between" gap={2}>
                        <Field
                          as={DatePicker}
                          name="authorizedPerson.dob"
                          label="Date of Birth"
                          value={values.authorizedPerson.dob}
                          onChange={(date: Date | null) =>
                            handleDateChange('authorizedPerson.dob', date, setFieldValue)
                          }
                          renderInput={(params: any) => <TextField {...params} fullWidth />}
                          error={touched.authorizedPerson?.dob && !!errors.authorizedPerson?.dob}
                          helperText={touched.authorizedPerson?.dob && errors.authorizedPerson?.dob}
                        />
                        <Field
                          as={TextField}
                          name="authorizedPerson.mobile"
                          label="Mobile"
                          error={
                            touched.authorizedPerson?.mobile && !!errors.authorizedPerson?.mobile
                          }
                          helperText={
                            touched.authorizedPerson?.mobile && errors.authorizedPerson?.mobile
                          }
                          fullWidth
                        />
                      </Box>

                      <Button fullWidth type="submit" variant="contained" color="primary">
                        Proceed to verify
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default AuthorizationDetails;
