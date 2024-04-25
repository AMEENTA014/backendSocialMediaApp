import { prisma } from "../prisma.js";
export const findAppModel = async (userId,taskId) => {
    try {
        const likes = await prisma.application.findMany({
            where: {
                AND: [
                    { userId: userId },
                    { taskId: taskId }
                ]
            }
        });
        return likes.length > 0;
    } catch (err) {
        throw new Error("DatabaseError");
    }
};