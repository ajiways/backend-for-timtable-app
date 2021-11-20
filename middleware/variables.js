export function authMiddleware(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    next()
}