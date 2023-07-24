const base = '/auth';

const AuthApi = {
  base,
  sendOtp: base + '/send-otp',
  login: base + '/login',
  signup: base + '/signup',
  changePassword: base + '/change-password',
};

export default AuthApi;
