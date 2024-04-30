import { prisma } from "../prisma.js";

export const findSubmissionModel = async (userId, taskId) => {
    try {
        const submissions = await prisma.submission.findMany({
            where: {
                AND: [
                    { userId: userId },
                    { taskId: taskId }
                ]
            }
        });
        return submissions.length > 0;
    } catch (err) {
        throw new Error("DatabaseError");
    }
};