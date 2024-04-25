import { prisma } from '../prisma.js';

export const getAllUserAppModel = async (userId) => {
  try {
    const applicationsWithUserAndTaskDetails = await prisma.application.findMany({
      where: {
        userId: userId
      },
      include: {
        userApplied: true, 
        taskApplied: true  
      },
    });

    
    return applicationsWithUserAndTaskDetails.map((application) => ({
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
    }));
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}