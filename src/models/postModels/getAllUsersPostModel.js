import {prisma}from '../prisma.js'
export const getAllUsersPostModel=async()=>
 {
    try
    {
        const postsWithUserDetailsAndLikes = await prisma.post.findMany({
            include: {
              userPost: true, // Include the user details associated with each post
              likes: true, // Include the likes associated with each post
              comments: {
                include: {
                  userComment: true, // Include the user details associated with each comment
                },
              },
            },
          });
        
          // Transform the response to include only necessary data
        return postsWithUserDetailsAndLikes.map((post) => ({
            id: post.postId,
            content: post.content,
            link: post.link,
            timestamp: post.timeStamp,
            thumbnail: post.thumbnail,
            likes: post.likes, // Include the likes associated with each post
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