import { prisma } from '../prisma.js';

export const getUserAppModel = async (userId) => {
  try {
    return await prisma.application.findMany({
      where: {
        userId: userId
      },
    });
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}