import bcrypt from 'bcrypt';
export const validatePassword=async(pass,dbPass)=>{
    return await bcrypt.compare(pass,dbPass);
  
}