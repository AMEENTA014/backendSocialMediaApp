import { prisma } from "../prisma.js";

export const getTaskWAAS = async(taskId) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                taskId: taskId
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

        // Format the response
        return {
            id: task.taskId,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            points: task.points,
            createdAt: task.createdAt,
            owner: {
                id: task.owner.userId,
                name: task.owner.userName,
                email: task.owner.email,
                profile_link: task.owner.profilePicLink
            },
            applications: task.applications.map((application) => ({
                id: application.applicationId,
                status: application.status,
                applicationDate: application.applicationDate,
                user: {
                    id: application.userApplied.userId,
                    name: application.userApplied.userName,
                    email: application.userApplied.email,
                    profile_link: application.userApplied.profilePicLink
                },
            })),
            submissions: task.submissions.map((submission) => ({
                id: submission.submissionId,
                submissionDate: submission.submissionDate,
                feedback: submission.feedback,
                rating: submission.rating,
                pointsAwarded: submission.pointsAwarded,
                link: submission.link,
                content: submission.content,
                thumbnail: submission.thumbnail,
                user: {
                    id: submission.userSubmission.userId,
                    name: submission.userSubmission.userName,
                    email: submission.userSubmission.email,
                    profile_link: submission.userSubmission.profilePicLink
                },
            })),
        };
    } catch(err) {
        throw new Error("Database error: " + err.message);
    }
}
