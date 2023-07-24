import * as Yup from 'yup';

export class TelegramLoginSchema {
  schema;

  initialValues;

  constructor(code = false) {
    this.schema = Yup.object({
      phoneNumber: Yup.string().required('Mobile no required!'),
      code: code ? Yup.string().required('Please enter 5 digit otp') : Yup.string().optional()
    });

    this.initialValues = {
      phoneNumber: '',
      code: ''
    };
  }
}
