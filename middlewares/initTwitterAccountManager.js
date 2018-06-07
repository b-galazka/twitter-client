const TwitterAccountManager = require('../tools/TwitterAccountManager');

module.exports = function initTwitterAccountManager(req, res, next) {

    const { twitterKey, twitterSecret } = req.cookies;

    req.twitterAccountManager = new TwitterAccountManager({
        userToken: twitterKey,
        userTokenSecret: twitterSecret
    });

    next();
}