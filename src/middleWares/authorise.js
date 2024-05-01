import {getUserModel}from '../models/userModels/index.js';
export const authorize = (roles) => {
   return async (req, res, next) => {
       const user = await getUserModel(req.roleData.userId); // Fetch the user from the database
       if (!user || !roles.includes(user.role)) {
        return res.status(401).send('Unauthorized');
    }
    return next();
}
}