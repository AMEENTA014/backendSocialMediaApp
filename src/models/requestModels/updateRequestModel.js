import { AppStatus } from "@prisma/client";
import { prisma } from "../prisma.js";
export const updateRequestModel=async(requestId,Rdata)=>{
   try{
      if(!(Rdata.status)||  !(Object.values(AppStatus).includes(Rdata.status))){
         const err = new Error("NotAValidStatus");
         err.status = 400;
         throw err;
     }
      return await prisma.pointConversionRequest.update({
       where:{requestId:requestId},
        data:Rdata
    })
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}