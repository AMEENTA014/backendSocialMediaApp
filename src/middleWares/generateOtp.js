import SE from 'speakeasy';
export const generateOtp=async()=>{
 const secret = SE.generateSecret({length: 20});
    const otp = SE.totp({
      secret: secret.base32,
      encoding: "base32",
      digits: 6,
    });
    return {otp,secret:secret.base32};
  }