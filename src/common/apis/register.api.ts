const base = '/register';

const RegisterApi = {
  base,
  requestModule: base + '/request-module',
  getGstDetails: base + '/get-gst-details',
  sendGstOtp: base + '/send-gst-otp',
  verifyGstOtp: base + '/verify-gst-otp',
  getRequiredDocument: base + '/get-document-requirement',
  uploadDocument: base + '/upload-document',
  saveAddress: base,
};

export default RegisterApi;
