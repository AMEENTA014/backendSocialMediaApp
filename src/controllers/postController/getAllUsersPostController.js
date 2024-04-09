import { getAllUsersPostModel } from "../../models/postModels/index.js";
export const getAllUsersPostController = async(req, res, next) => {
    try {
        const posts = await getAllUsersPostModel();
        res.status(200).send(posts);
    } catch(err) {
        return next(err);
    }
}