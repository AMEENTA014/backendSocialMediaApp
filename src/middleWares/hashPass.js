import bcrypt from 'bcrypt';
export const hashPass=async(password)=>{ 
    try{
        return bcrypt.hash(password, 10)
    }
    catch(err){
      throw new Error('Error while hashing pass'); 
    }
}