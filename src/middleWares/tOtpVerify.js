 import SE from 'speakeasy';
 export async function tOtpVerify(data,otp) {
  return SE.totp.verify({ 
    secret: data.secret,
    encoding: 'base32',
    token: otp ,
    window:20
})
 }
