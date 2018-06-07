const TwitterAuth = require('./TwitterAuth');
const Connection = require('./Connection');

class TwitterAccountManager {

    constructor({ userToken, userTokenSecret }) {

        this._userToken = userToken;
        this._userTokenSecret = userTokenSecret;
    }

    updateStatus(params) {

        return Connection.sendHttpsRequest({
            method: 'POST',
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/update.json' + TwitterAccountManager._stringifyParams(params),

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'POST',
                    url: 'https://api.twitter.com/1.1/statuses/update.json',
                    userSecret: this._userTokenSecret,
                    userToken: this._userToken,
                    params
                })
            }
        });
    }

    getTweets(params) {

        return Connection.sendHttpsRequest({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json' + TwitterAccountManager._stringifyParams(params),

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                    userSecret: this._userTokenSecret,
                    userToken: this._userToken,
                    params
                })
            }
        });
    }

    getFollowers(params) {

        return Connection.sendHttpsRequest({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/followers/list.json' + TwitterAccountManager._stringifyParams(params),

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/followers/list.json',
                    userSecret: this._userTokenSecret,
                    userToken: this._userToken,
                    params
                })
            }
        });
    }

    getFriends(params) {

        return Connection.sendHttpsRequest({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/friends/list.json' + TwitterAccountManager._stringifyParams(params),

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/friends/list.json',
                    userSecret: this._userTokenSecret,
                    userToken: this._userToken,
                    params
                })
            }
        });
    }

    getProfileInfo(params) {

        return Connection.sendHttpsRequest({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/account/verify_credentials.json' + TwitterAccountManager._stringifyParams(params),

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
                    userSecret: this._userTokenSecret,
                    userToken: this._userToken,
                    params
                })
            }
        });
    }

    static _stringifyParams(params) {

        const paramsStr = Object.keys(params).reduce((paramsStr, key) => {

            const encodedValue = encodeURIComponent(params[key]);

            return paramsStr + `${(paramsStr === '') ? '?' : '&'}${key}=${encodedValue}`;

        }, '');

        return paramsStr;
    }
}

module.exports = TwitterAccountManager;