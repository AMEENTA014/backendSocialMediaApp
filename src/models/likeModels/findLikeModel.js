import { prisma } from "../prisma.js";
export const findLikeModel = async (userId, postId) => {
    try {
        const likes = await prisma.like.findMany({
            where: {
                AND: [
                    { userId: userId },
                    { postId: postId }
                ]
            }
        });
        return likes.length > 0;
    } catch (err) {
        throw new Error("DatabaseError");
    }
};