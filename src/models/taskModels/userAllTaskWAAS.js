import { prisma } from "../prisma.js";

export const userAllTaskWAAS = async(userId) => {
    try {
        const tasks=await prisma.task.findMany({
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
        return tasks.map(task => ({
            taskId: task.id,
            taskName: task.name,
            taskDescription: task.description,
            taskStatus: task.status,
            owner: {
                userId: task.owner.userId,
                userName: task.owner.userName,
                email: task.owner.email,
                profilePicLink: task.owner.profilePicLink,
                role: task.owner.role,
                contactInfo: task.owner.contactInfo,
            },
            applications: task.applications.map(application => ({
                applicationId: application.id,
                status:application.status,
                userApplied: {
                    userId: application.userApplied.userId,
                    userName: application.userApplied.userName,
                    email: application.userApplied.email,
                    profilePicLink: application.userApplied.profilePicLink,
                    role: application.userApplied.role,
                    contactInfo: application.userApplied.contactInfo,
                }
            })),
            submissions: task.submissions.map(submission => ({
                submissionId: submission.id,
                status:submission.status,
                userSubmission: {
                    userId: submission.userSubmission.userId,
                    userName: submission.userSubmission.userName,
                    email: submission.userSubmission.email,
                    profilePicLink: submission.userSubmission.profilePicLink,
                    role: submission.userSubmission.role,
                    contactInfo: submission.userSubmission.contactInfo,
                }
            })),
        }));
        
    } catch(err) {
        throw new Error("dataBaseError"+err.message);
    }
}