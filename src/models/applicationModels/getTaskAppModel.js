import { prisma } from '../prisma.js';
export const getTaskAppModel= async (taskId) => {
  try {
    return  await prisma.application.findMany({
      where: {
        taskId: taskId
      },
    });    
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}