const router = require('express').Router();

const TwitterAuth = require('../tools/TwitterAuth');

module.exports = {

    async getAuthUrl(req, res) {

        try {

            const data = await TwitterAuth.requestToken();

            res.cookie('twitterSecret', data.oauth_token_secret, { httpOnly: true });

            res.send({
                authUrl: `https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}`
            });

        } catch (err) {

            console.error(err);

            res.status(500).send({ message: 'something went wrong' });
        }
    },

    async auth(req, res) {

        try {

            const { oauth_verifier, oauth_token } = req.query;
            const { cookies } = req;

            if (!cookies.twitterSecret || !oauth_verifier || !oauth_token) {

                return res.status(403).send({
                    message: 'missing credentials'
                });
            }

            const data = await TwitterAuth.accessToken({
                authVerifier: oauth_verifier,
                userToken: oauth_token,
                userSecret: cookies.twitterSecret
            });

            res.cookie('twitterKey', data.oauth_token, { httpOnly: true });
            res.cookie('twitterSecret', data.oauth_token_secret, { httpOnly: true });
            res.cookie('authenticated', true);

            res.redirect('/');

        } catch (err) {

            console.error(err);

            res.status(500).send({ message: 'something went wrong' });
        }
    },

    logout(req, res) {

        res.clearCookie('authenticated');
        res.clearCookie('twitterKey');
        res.clearCookie('twitterSecret');

        res.redirect('/');
    }
};