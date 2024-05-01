import { prisma } from '../prisma.js';
import {Status} from '@prisma/client';
export const createTaskModel = async(data) => {
    try {
        if ((data.status)&&(!Object.values(Status).includes(data.status))) {
            throw new Error(`Invalid status: ${data.status}`);
        }
          const deadlineDate = new Date(data.deadline);
          data.deadline = deadlineDate.toISOString();
          data.points = parseInt(data.points, 10);
        return await prisma.task.create({
           data:{
            title:data.title,
            description:data.description,
            ownerId:data.ownerId,
            deadline:data.deadline,
            status:data.status,
            points:data.points,
            createdAt:new Date()
           }
        });
    } catch(err) {
        throw new Error('dataBaseError'+err.message);
    }
}