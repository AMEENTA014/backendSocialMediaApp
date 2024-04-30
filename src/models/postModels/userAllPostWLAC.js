import {prisma}from '../prisma.js'
export const userAllPostWLAC=async(userId)=>
 {
    try
    {
        const postsWithUserDetailsAndLikes = await prisma.post.findMany({
            where:{
               userId:userId 
            },
            include: {
              userPost: true, 
              likes: true, 
              comments: {
                include: {
                  userComment: true, 
                },
              },
            },
          });
        
          
        return postsWithUserDetailsAndLikes.map((post) => ({
            id: post.postId,
            content: post.content,
            link: post.link,
            timestamp: post.timeStamp,
            thumbnail: post.thumbnail,
            likes: post.likes, 
            comments: post.comments.map((comment) => ({
              id: comment.commentId,
              content: comment.content,
              timestamp: comment.timestamp,
              user: {
                id: comment.userComment.userId,
                name: comment.userComment.email,
                profile_link: comment.userComment.profilePicLink
              },
            })),
            user: {
              id: post.userPost.userId,
              name: post.userPost.email,
              profile_link: post.userPost.profilePicLink
            },
          }));
    }
    catch(err)
    {
    throw new Error("dataBaseError"+err.message);    
    }
}