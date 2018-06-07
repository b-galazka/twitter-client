module.exports = {

    async updateStatus(req, res) {

        try {

            const { twitterAccountManager } = req;

            const twitterRes = await twitterAccountManager.updateStatus(req.body);

            res.set('Content-Type', 'application/json; charset=utf-8')
            res.send(twitterRes);

        } catch (err) {

            console.error(err);

            res.status(err.statusCode || 500).send({
                message: err.res || 'something went wrong'
            });
        }
    },

    async getTweets(req, res) {

        try {

            const { twitterAccountManager } = req;

            const twitterRes = await twitterAccountManager.getTweets(req.query);

            res.set('Content-Type', 'application/json; charset=utf-8')
            res.send(twitterRes);

        } catch (err) {

            console.error(err);

            res.status(err.statusCode || 500).send({
                message: err.res || 'something went wrong'
            });
        }
    },

    async getFollowers(req, res) {

        try {

            const { twitterAccountManager } = req;

            const twitterRes = await twitterAccountManager.getFollowers(req.query);

            res.set('Content-Type', 'application/json; charset=utf-8')
            res.send(twitterRes);

        } catch (err) {

            console.error(err);

            res.status(err.statusCode || 500).send({
                message: err.res || 'something went wrong'
            });
        }
    },

    async getFriends(req, res) {

        try {

            const { twitterAccountManager } = req;

            const twitterRes = await twitterAccountManager.getFriends(req.query);

            res.set('Content-Type', 'application/json; charset=utf-8')
            res.send(twitterRes);

        } catch (err) {

            console.error(err);

            res.status(err.statusCode || 500).send({
                message: err.res || 'something went wrong'
            });
        }
    },

    async getProfile(req, res) {

        try {

            const { twitterAccountManager } = req;

            const twitterRes = await twitterAccountManager.getProfileInfo(req.query);

            res.set('Content-Type', 'application/json; charset=utf-8')
            res.send(twitterRes);

        } catch (err) {

            console.error(err);

            res.status(err.statusCode || 500).send({
                message: err.res || 'something went wrong'
            });
        }
    }
};