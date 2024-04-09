import { prisma } from "../../models/prisma.js";
export const getLeaderBoard=async(req,res,next)=>{
    try{
        res.status(200).send(await prisma.user.findMany({orderBy:{points:'desc'}}));
    }
    catch(err){
       return next(err);
    }
}