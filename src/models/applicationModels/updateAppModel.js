import { prisma } from '../prisma.js';
import { AppStatus } from '@prisma/client';
export const updateAppModel = async (applicationId, applicationData) => {
  try {
    if(!(applicationData.status) ||(!Object.values(AppStatus).includes(applicationData.status))){
      const err = new Error("NotAValidStatus");
      err.status = 400;
      throw err;
  }
    return await prisma.application.update({
      where: {
        applicationId: applicationId
      },
      data: applicationData
    });
  } catch (err) {
    throw new Error('DatabaseError: ' + err.message);
  }
};
