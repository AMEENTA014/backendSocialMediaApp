import { prisma } from "../prisma.js";

export const userAllTaskWAAS = async(userId) => {
    try {
        return await prisma.task.findMany({
            where: {
                ownerId: userId
            },
            include: {
                owner:{
                    select:{
                       userId:true,
                       email:true,
                       userName:true,
                       profilePicLink:true,
                       role:true,
                       contactInfo:true
                    }
                },
                applications: {
                    where: {
                        OR: [
                            { status: 'APPLIED' },
                            { status: 'REJECTED' }
                        ]
                    },
                    include: {
                        userApplied: {
                            select: {
                                userId: true,
                                userName: true,
                                email: true,
                                profilePicLink: true,
                                role: true,
                                contactInfo: true,
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        userSubmission: {
                            select: {
                                userId: true,
                                userName: true,
                                email: true,
                                profilePicLink: true,
                                role: true,
                                contactInfo: true,
                            }
                        }
                    }
                }
            }
        });
    } catch(err) {
        throw new Error("dataBaseError"+err.message);
    }
}