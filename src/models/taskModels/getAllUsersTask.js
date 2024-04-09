import { prisma } from "../prisma.js";
export const getAllUserTasksModel = async() => {
    try {
        return await prisma.task.findMany();
    } catch(err) {
        throw new Error("dataBaseError"+err.message);
    }
}