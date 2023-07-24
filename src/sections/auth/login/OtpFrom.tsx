import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { Formik } from 'formik';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

type FormValuesProps = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  afterSubmit?: string;
};

type FormProp = {
  verifyOtp: (values: FormValuesProps) => Promise<any>;
};

let nextfield: any = '';
let nextfield2: any = '';
let nextfield3: any = '';

export default function OtpForm({ verifyOtp }: FormProp) {
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    nextfield = document.getElementById('myTextInput');
    nextfield2 = document.getElementById('myTextInput2');
    nextfield3 = document.getElementById('myTextInput3');
  }, [document]);

  const OtpSchema = Yup.object().shape({
    otp1: Yup.string().required('').min(1, '').max(1, ''),
    otp2: Yup.string().required('').min(1, '').max(1, ' '),
    otp3: Yup.string().required('').min(1, ' ').max(1, ' '),
    otp4: Yup.string().required('').min(1, ' ').max(1, ' '),
  });

  const defaultValues = {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  };

  return (
    <Formik onSubmit={verifyOtp} validationSchema={OtpSchema} initialValues={defaultValues}>
      {({ handleChange, handleSubmit, errors, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mb={4} direction="row">
            <TextField
              type="text"
              sx={{ width: 60 }}
              id="myTextInput"
              name="otp1"
              value={values.otp1}
              onChange={(e) => {
                handleChange(e);
                console.log('log:', e.target.value);
                if (e.target?.value?.length === 1) {
                  if (nextfield) {
                    nextfield.focus();
                  }
                }
              }}
            />
            <TextField
              type="text"
              sx={{ width: 60 }}
              id="myTextInput2"
              value={values.otp2}
              onChange={(e) => {
                handleChange(e);
                if (e.target?.value?.length == 1) {
                  if (nextfield2) {
                    nextfield2.focus();
                  }
                }
              }}
              name="otp2"
            />
            <TextField
              type="text"
              sx={{ width: 60 }}
              id="myTextInput3"
              value={values.otp3}
              name="otp3"
              onChange={(e) => {
                handleChange(e);
                if (e.target?.value?.length === 1) {
                  if (nextfield3) {
                    nextfield3.focus();
                  }
                }
              }}
            />
            <TextField value={values.otp4} onChange={handleChange} sx={{ width: 60 }} name="otp4" />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Proceed to verify
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
}
