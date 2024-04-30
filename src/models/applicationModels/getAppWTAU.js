import { prisma } from '../prisma.js';
export const getAppWTAU = async (appId) => {
  try {
    const application = await prisma.application.findUnique({
      where: {
        applicationId:appId
      },
      include: {
        userApplied: true, 
        taskApplied: true 
      },
    });    
    return  {
      id: application.applicationId,
      status: application.status,
      applicationDate: application.applicationDate,
      task: {
        id: application.taskApplied.taskId,
        title: application.taskApplied.title,
        description: application.taskApplied.description,
        deadline: application.taskApplied.deadline,
        status: application.taskApplied.status,
        points: application.taskApplied.points,
      },
      user: {
        id: application.userApplied.userId,
        name: application.userApplied.email,
        profile_link: application.userApplied.profilePicLink
      },
    };
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}