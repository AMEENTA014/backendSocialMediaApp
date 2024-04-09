import { prisma } from "../prisma.js";
export const deleteTaskModel = async(taskId) => {
    try {
        return await prisma.task.delete({
            where: {
                taskId: taskId
            }
        });
    } catch(err) {
        throw new Error("dataBaseError");
    }
}
