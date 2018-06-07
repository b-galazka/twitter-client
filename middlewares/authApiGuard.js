module.exports = function authApiGuard(req, res, next) {

    const { twitterKey, twitterSecret } = req.cookies;

    if (twitterKey && twitterSecret) {

        return next();
    }

    res.status(403).send({ message: 'authentication required' });
}