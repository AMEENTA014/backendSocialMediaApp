export const facultyAuth=async(req,res,next)=>{
     if(req.roleData.role==="FACULTY")
        {
           return next()
        }   
        const err=new Error("ForbiddenAccess");
        err.status=403;
        return next(err);

}