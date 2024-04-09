export const servErr=async(err,req,res,next)=>{
    res.status(err.status||500).send(err.message||"internalServerError");
}
    


