const base = '/auth';

const AuthApi = {
  base,

  login: base + '/login',
  validate: base + '/validate',
  sendOtp: base + '/send-otp',
  signup: base + '/signup',
  changePassword: base + '/change-password',
};

export default AuthApi;
