import { Card, Box, Typography, Button, TextField, Link } from '@mui/material';
import Logo from 'src/components/Logo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  gstNo: Yup.string().required('GST Number is required'),
});

const GSTNumberForm = ({ handleGSTSubmit }: any) => {
  const initialValues = {
    gstNo: '',
  };

  const handleSubmit = (values: any) => {
    handleGSTSubmit(values);
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 440,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 2,
      }}
    >
      <Box textAlign="center">
        <Logo sx={{ height: 150, width: 150 }} height={150} width={150} />
      </Box>
      <Typography mb={2} fontWeight={500}>
        Enter GST Number
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              as={TextField}
              name="gstNo"
              label="GST Number"
              value={values.gstNo}
              onChange={handleChange}
              error={touched.gstNo && errors.gstNo}
              helperText={touched.gstNo && errors.gstNo}
            />
            <br />
            <Box textAlign="center">
              <Button sx={{ mt: 2 }} variant="contained" type="submit">
                Proceed to verify
              </Button>
            </Box>
            <Typography variant="body2" my={3}>
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" onClick={() => {}}>
                Resend code
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default GSTNumberForm;
