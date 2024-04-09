export const adminAuth=async(req,res,next)=>{
    if(req.roleData.role==="ADMIN")
       {
          return next()
       }   
       const err=new Error("ForbiddenAccess");
       err.status=403;
       return next(err);

}