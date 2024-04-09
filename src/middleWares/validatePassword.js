import bcrypt from 'bcrypt';
export const validatePassword=async(pass,dbPass)=>{
  try{
   return await bcrypt.compare(pass,dbPass);
  }catch(err){
    throw new Error(`passwordvalidationError${err}`); 
  }

}