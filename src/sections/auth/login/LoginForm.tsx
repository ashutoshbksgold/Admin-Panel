import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { AuthApi, getApi, postApi } from "src/common/apis";
import axios from "axios";

// ----------------------------------------------------------------------

type FormValuesProps = {
  mobile: string;
  afterSubmit?: string;
};

type LoginFromProps = {
  isLoading: boolean;
  mobileNumberSubmit: (values: FormValuesProps) => Promise<any>;
};

export default function LoginForm({
  mobileNumberSubmit,
  isLoading,
}: LoginFromProps) {
  const isMountedRef = useIsMountedRef();

  const LoginSchema = Yup.object().shape({
    mobile: Yup.string()
      .required("Mobile number required")
      .min(10, "Enter a valid mobile number")
      .max(10, "Enter a valid phone number"),
  });

  const defaultValues = {
    mobile: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(mobileNumberSubmit)}>
      <Stack spacing={3} mb={2}>
        <RHFTextField fullWidth name="mobile" label="Mobile Number" />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Proceed to verify
      </LoadingButton>
    </FormProvider>
  );
}
