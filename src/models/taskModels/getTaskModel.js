import { prisma } from '../prisma.js'
export const getTaskModel = async(taskId) => {
    try {
        return await prisma.task.findUnique({
            where: {
                taskId: taskId
            }
        });
    } catch(err) {
        throw err;
    }
}