export const logoutUserController = async (req, res, next) => {
    try {
      res.clearCookie('token');
      res.status(200).send('LogoutSuccess');
    } catch (err) {
      next(err);
    }
  }