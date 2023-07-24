import * as Yup from 'yup';

export class UserAccountSchema {
  schema;

  initialValues;

  constructor() {
    this.schema = Yup.object({
      firstName: Yup.string().required('First name required'),
      lastName: Yup.string().required('Last name required'),
      username: Yup.string().email('Must be a valid email id!').required('Username required'),
      phoneNumber: Yup.string().optional(),
      about: Yup.string().optional()
    });

    this.initialValues = {
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      about: ''
    };
  }
}
