import { prisma } from "../../models/prisma.js";
export const getLeaderBoard=async(req,res,next)=>{
    try{
        const users=await prisma.user.findMany({orderBy:{points:'desc'}});
        users.forEach(user=>{
            delete user.password;
        })
        res.status(200).send(users);

    }
    catch(err){
       return next(err);
    }
}