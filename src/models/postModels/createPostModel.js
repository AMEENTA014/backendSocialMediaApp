import { prisma } from "../prisma.js";
export const createPostModel = async(postData) => {
  try {
      return await prisma.post.create({
          data: {
              userId: postData.userId,
              content:postData.content||null,
              link:postData.link||null,
              thumbnail:postData.thumbnail||null,
              timeStamp: new Date()
          }
      });
  } catch(err) {
      throw err;
  }
}