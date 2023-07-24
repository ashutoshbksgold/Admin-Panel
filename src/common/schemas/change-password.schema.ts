import * as Yup from 'yup';

export class ChangePasswordSchema {
  schema;

  initialValues;

  constructor() {
    this.schema = Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('New Password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
    });

    this.initialValues = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }
}
