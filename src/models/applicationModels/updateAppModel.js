import { prisma } from '../prisma.js';

export const updateAppModel = async (applicationId, applicationData) => {
  try {
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
