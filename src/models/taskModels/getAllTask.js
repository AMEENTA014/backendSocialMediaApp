import { prisma } from "../prisma.js";
export const getAllTasksModel = async(userId) => {
    try {
        return await prisma.task.findMany({
            where: {
                ownerId: userId
            }
        });
    } catch(err) {
        throw new Error("dataBaseError"+err.message);
    }
}