const crypto = require('crypto');

const Connection = require('./Connection');
const { twitterSecret, twitterKey } = require('../config');

class TwitterAuth {

    static async accessToken({ authVerifier, userSecret, userToken }) {

        const res = await Connection.sendHttpsRequest({
            method: 'POST',
            hostname: 'api.twitter.com',
            path: `/oauth/access_token?oauth_verifier=${authVerifier}`,

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'POST',
                    url: `https://api.twitter.com/oauth/access_token?oauth_verifier=${authVerifier}`,

                    params: {
                        oauth_verifier: authVerifier
                    },

                    userSecret,
                    userToken
                })
            }
        });

        return TwitterAuth._convertDataStrToObject(res);
    }

    static async requestToken() {

        const res = await Connection.sendHttpsRequest({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/oauth/request_token',

            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/oauth/request_token'
                })
            }
        });

        return TwitterAuth._convertDataStrToObject(res);
    }

    static _convertDataStrToObject(dataStr) {

        const obj = dataStr.split('&').reduce((dataObj, dataPart) => {

            const [key, value] = dataPart.split('=');

            dataObj[key] = value;

            return dataObj;

        }, {});

        return obj;
    }

    static generateAuthHeader({ method, url, params = {}, userSecret = '', userToken = '' }) {

        const oAuthNonce = TwitterAuth._generateRandomString(32);
        const timestamp = Math.floor(Date.now() / 1000);

        const oAuthParams = {
            oauth_consumer_key: twitterKey,
            oauth_nonce: oAuthNonce,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: timestamp,
            oauth_token: userToken,
            oauth_version: '1.0'
        };

        Object.assign(params, oAuthParams);

        const paramsString = TwitterAuth._generateParamsString(params);
        const signature = TwitterAuth._generateSignature({ method, url, paramsString, userSecret });

        let authHeader = Object.keys(oAuthParams).reduce((header, key) => {

            const encodedValue = encodeURIComponent(oAuthParams[key]);
            const encodedKey = encodeURIComponent(key);

            return header + `${(header === 'OAuth ') ? '' : ', '}${encodedKey}="${encodedValue}"`;

        }, 'OAuth ');

        authHeader += `, ${encodeURIComponent('oauth_signature')}="${encodeURIComponent(signature)}"`;

        return authHeader;
    }

    static _generateSignature({ method, url, paramsString, userSecret = '' }) {

        const signatureKey = `${twitterSecret}&${userSecret}`;

        let signatureBase = `${method.toUpperCase()}&`;
            signatureBase += `${encodeURIComponent(url)}&`;
            signatureBase += encodeURIComponent(paramsString);

        return crypto.createHmac('sha1', signatureKey).update(signatureBase).digest('base64');
    }

    static _generateParamsString(params) {

        const encodedParams = TwitterAuth._getEncodedParamsObject(params);
        const sortedParams = TwitterAuth._getSortedParamsObject(encodedParams);

        const paramsString = Object.keys(sortedParams).reduce((str, key) => {

            const value = sortedParams[key];

            return str + `${(str === '') ? '' : '&'}${key}=${value}`;

        }, '');

        return paramsString;
    }

    static _generateRandomString(length) {

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let output = '';

        for (let i = 0; i < length; i++) {

            const isLowercase = (Math.random() > 0.5);
            const index = Math.floor(Math.random() * chars.length);
            const char = chars.charAt(index);

            output += (isLowercase) ? char.toLowerCase() : char;
        }

        return output;
    }

    static _getEncodedParamsObject(paramsObject) {

        const encodedParams = {};

        Object.keys(paramsObject).forEach((key) => {

            const value = paramsObject[key];

            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);

            encodedParams[encodedKey] = encodedValue;
        });

        return encodedParams;
    }

    static _getSortedParamsObject(encodedParamsObject) {

        const sortedParams = {};

        const sortedKeys = Object.keys(encodedParamsObject).sort((a, b) => {

            if (a === b) {

                return 0;
            }

            return (a > b) ? 1 : -1;
        });

        sortedKeys.forEach((key) => {

            const value = encodedParamsObject[key];

            sortedParams[key] = value;
        });

        return sortedParams;
    }
}

module.exports = TwitterAuth;