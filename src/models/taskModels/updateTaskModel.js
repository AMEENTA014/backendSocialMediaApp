import { prisma } from "../prisma.js";
import { Status } from "@prisma/client";
export const updateTaskModel = async(taskId, taskData) => {
    try {
        if(!(taskData.status) ||!(Object.values(Status).includes(taskData.status))){
            const err = new Error("NotAValidStatus");
            err.status = 400;
            throw err;
        }
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