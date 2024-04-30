import {getAllPostModel} from "../../models/postModels/index.js";
export const getAllPostController = async(req, res, next) => {
    try {
        const posts = await getAllPostModel();
        res.status(200).send(posts);
    } catch(err) {
        return next(err);
    }
}