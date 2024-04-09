import { prisma } from "../prisma.js";
export const updateTaskModel = async(taskId, taskData) => {
    try {
        return await prisma.task.update({
            where: {
                taskId: taskId
            },
            data: taskData
        });
    } catch(err) {
        throw new Error ("dataBaseError");
    }
}