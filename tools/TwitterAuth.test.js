const crypto = require('crypto');

const TwitterAuth = require('./TwitterAuth');
const Connection = require('./Connection');
const { twitterSecret, twitterKey } = require('../config');

jest.mock(
    './Connection',
    () => require('../mocks/Connection').success
);

describe('TwitterAuth._getSortedParamsObject', () => {

    it('should sort object keys alphabetically', () => {

        const obj = {
            c: 10,
            a: 20,
            g: 30,
            b: 40
        };

        expect(TwitterAuth._getSortedParamsObject(obj)).toEqual({
            a: 20,
            b: 40,
            c: 10,
            g: 30
        });
    });
});

describe('TwitterAuth._getEncodedParamsObject', () => {

    it('should percent encode object keys and values', () => {

        const obj = {
            ' a': '#a',
            '%10': '^2'
        };

        expect(TwitterAuth._getEncodedParamsObject(obj)).toEqual({
            '%20a': '%23a',
            '%2510': '%5E2'
        });
    });
});

describe('TwitterAuth._generateRandomString', () => {

    it('should generate string with length equal to provided param', () => {

        expect(TwitterAuth._generateRandomString(32)).toHaveLength(32);
    });
});

describe('TwitterAuth._generateParamsString', () => {

    it('should return stringified params sorted alphabetically', () => {

        const params = { param1: '#lorem%ipsum', '$param2': 'value' };
        const stringifiedParams = TwitterAuth._generateParamsString(params);

        expect(stringifiedParams).toBe('%24param2=value&param1=%23lorem%25ipsum');
    });

    it('should return stringified param', () => {

        const params = { param1: '#lorem%ipsum' };
        const stringifiedParams = TwitterAuth._generateParamsString(params);

        expect(stringifiedParams).toBe('param1=%23lorem%25ipsum');
    });
});

describe('TwitterAuth._generateSignature', () => {

    const url = 'https://example.com/?param1=value 1';
    const paramsString = 'param1=value 1';

    it('should set userSecret to empty string by default', () => {

        const method = 'post';

        const signature = TwitterAuth._generateSignature({
            method,
            url,
            paramsString
        });

        const testSignature = crypto
            .createHmac('sha1', `${twitterSecret}&`)
            .update(
                `${method.toUpperCase()}&${encodeURIComponent(url)}&` +
                encodeURIComponent(paramsString)
            )
            .digest('base64');

        expect(signature).toBe(testSignature);
    });

    it('should generate valid sha1 signature encoded to base64', () => {

        const method = 'post';
        const userSecret = 'user_secret';

        const signature = TwitterAuth._generateSignature({
            method,
            url,
            paramsString,
            userSecret
        });

        const testSignature = crypto
            .createHmac('sha1', `${twitterSecret}&${userSecret}`)
            .update(
                `${method.toUpperCase()}&${encodeURIComponent(url)}&` +
                encodeURIComponent(paramsString)
            )
            .digest('base64');

        expect(signature).toBe(testSignature);
    });
});

describe('TwitterAuth.generateAuthHeader', () => {

    const { _generateRandomString } = TwitterAuth;
    const dateNow = Date.now;
    const fakeCurrentTime = 1048576;
    const fakeRandomString = 'abcd';
    const userSecret = 'user_secret';
    const userToken = 'user_token';
    const url = 'https://example.com';

    beforeAll(() => {

        global.Date.now = () => fakeCurrentTime;
        TwitterAuth._generateRandomString = () => fakeRandomString;
    });

    it('should generate 32 chars length oAuthNonce using TwitterAuth._generateRandomString', () => {

        const spy = jest.spyOn(TwitterAuth, '_generateRandomString');

        TwitterAuth.generateAuthHeader({ method: '', url: '' });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(32);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should extend params by oAuth params', () => {

        const params = { param1: 'lorem', param2: 'ipsum' };

        TwitterAuth.generateAuthHeader({
            method: '',
            url: '',
            userToken: 'user_token',
            params
        });

        expect(params).toEqual({
            oauth_consumer_key: twitterKey,
            oauth_nonce: fakeRandomString,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(fakeCurrentTime / 1000),
            oauth_token: 'user_token',
            oauth_version: '1.0',
            param1: 'lorem',
            param2: 'ipsum'
        });
    });

    it('should generate params string using TwitterAuth._generateParamsString ' + 
        'providing params extended by oAuth params', () => {

        const spy = jest.spyOn(TwitterAuth, '_generateParamsString');
        const params = { param1: 'lorem', param2: 'ipsum' }

        TwitterAuth.generateAuthHeader({ method: '', url: '', params });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(params);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should generate signature using TwitterAuth._generateSignature ' +
        'providing method, url, userSecret and paramsString generated by ' +
        ' TwitterAuth._generateParamsString above', () => {

        const spy = jest.spyOn(TwitterAuth, '_generateSignature');
        const params = { param1: 'lorem', param2: 'ipsum' };
        const method = 'GET';

        TwitterAuth.generateAuthHeader({ method, url, params, userSecret });

        const paramsString = TwitterAuth._generateParamsString(params);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ method, url, paramsString, userSecret });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should return valid Authorization header value', () => {

        const method = 'POST';
        const params = { param1: 'value1' };

        const authHeaderValue = TwitterAuth.generateAuthHeader({
            method,
            url,
            params,
            userSecret,
            userToken
        });

        const signature = TwitterAuth._generateSignature({
            method,
            url,
            paramsString: TwitterAuth._generateParamsString(params),
            userSecret
        });

        let testAuthHeaderValue = `OAuth oauth_consumer_key="${encodeURIComponent(twitterKey)}", `;
            testAuthHeaderValue += `oauth_nonce="${encodeURIComponent(fakeRandomString)}", `;
            testAuthHeaderValue += 'oauth_signature_method="HMAC-SHA1", ';
            testAuthHeaderValue += `oauth_timestamp="${Math.floor(fakeCurrentTime / 1000)}", `;
            testAuthHeaderValue += `oauth_token="${encodeURIComponent(userToken)}", `;
            testAuthHeaderValue += 'oauth_version="1.0", ';
            testAuthHeaderValue += `oauth_signature="${encodeURIComponent(signature)}"`;

        expect(authHeaderValue).toBe(testAuthHeaderValue);
    });

    it('should set params as empty object by default', () => {

        const method = 'POST';

        const authHeaderValue = TwitterAuth.generateAuthHeader({
            method,
            url,
            userSecret,
            userToken
        });

        const signature = TwitterAuth._generateSignature({
            method,
            url,

            paramsString: TwitterAuth._generateParamsString({
                oauth_consumer_key: twitterKey,
                oauth_nonce: fakeRandomString,
                oauth_signature_method: 'HMAC-SHA1',
                oauth_timestamp: Math.floor(fakeCurrentTime / 1000),
                oauth_token: userToken,
                oauth_version: '1.0',
            }),

            userSecret
        });

        let testAuthHeaderValue = `OAuth oauth_consumer_key="${encodeURIComponent(twitterKey)}", `;
            testAuthHeaderValue += `oauth_nonce="${encodeURIComponent(fakeRandomString)}", `;
            testAuthHeaderValue += 'oauth_signature_method="HMAC-SHA1", ';
            testAuthHeaderValue += `oauth_timestamp="${Math.floor(fakeCurrentTime / 1000)}", `;
            testAuthHeaderValue += `oauth_token="${encodeURIComponent(userToken)}", `;
            testAuthHeaderValue += 'oauth_version="1.0", ';
            testAuthHeaderValue += `oauth_signature="${encodeURIComponent(signature)}"`;

        expect(authHeaderValue).toBe(testAuthHeaderValue);
    });

    it('should set userSecret as empty string by default', () => {

        const method = 'POST';
        const params = { param1: 'value1' };

        const authHeaderValue = TwitterAuth.generateAuthHeader({
            method,
            url,
            params,
            userToken
        });

        const signature = TwitterAuth._generateSignature({
            method,
            url,
            paramsString: TwitterAuth._generateParamsString(params),
            userSecret: ''
        });

        let testAuthHeaderValue = `OAuth oauth_consumer_key="${encodeURIComponent(twitterKey)}", `;
            testAuthHeaderValue += `oauth_nonce="${encodeURIComponent(fakeRandomString)}", `;
            testAuthHeaderValue += 'oauth_signature_method="HMAC-SHA1", ';
            testAuthHeaderValue += `oauth_timestamp="${Math.floor(fakeCurrentTime / 1000)}", `;
            testAuthHeaderValue += `oauth_token="${encodeURIComponent(userToken)}", `;
            testAuthHeaderValue += 'oauth_version="1.0", ';
            testAuthHeaderValue += `oauth_signature="${encodeURIComponent(signature)}"`;

        expect(authHeaderValue).toBe(testAuthHeaderValue);
    });

    it('should set userToken as empty string by default', () => {

        const method = 'POST';
        const params = { param1: 'value1' };
        const userSecret = 'user_secret';

        const authHeaderValue = TwitterAuth.generateAuthHeader({
            method,
            url,
            params,
            userSecret
        });

        const signature = TwitterAuth._generateSignature({
            method,
            url,
            paramsString: TwitterAuth._generateParamsString(params),
            userSecret
        });

        let testAuthHeaderValue = `OAuth oauth_consumer_key="${encodeURIComponent(twitterKey)}", `;
            testAuthHeaderValue += `oauth_nonce="${encodeURIComponent(fakeRandomString)}", `;
            testAuthHeaderValue += 'oauth_signature_method="HMAC-SHA1", ';
            testAuthHeaderValue += `oauth_timestamp="${Math.floor(fakeCurrentTime / 1000)}", `;
            testAuthHeaderValue += 'oauth_token="", ';
            testAuthHeaderValue += 'oauth_version="1.0", ';
            testAuthHeaderValue += `oauth_signature="${encodeURIComponent(signature)}"`;

        expect(authHeaderValue).toBe(testAuthHeaderValue);
    });

    afterAll(() => {

        global.Date.now = dateNow;
        TwitterAuth._generateRandomString = _generateRandomString;
    });
});

describe('TwitterAuth._convertDataStrToObject', () => {

    it('should return an empty object if empty string was provided', () => {

        expect(TwitterAuth._convertDataStrToObject('')).toEqual({});
    });

    it('should return an object with valid data', () => {

        const output = TwitterAuth._convertDataStrToObject(
            'param1=value1&param2=value2'
        );

        expect(output).toEqual({ param1: 'value1', param2: 'value2' });
    });
});

describe('TwitterAuth.requestToken', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(TwitterAuth.requestToken()).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        TwitterAuth.generateAuthHeader = (...params) => JSON.stringify(params);

        TwitterAuth.requestToken();

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
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

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data parsed to object', async () => {

        expect.assertions(1);

        const data = await TwitterAuth.requestToken();

        expect(data).toEqual({
            param1: 'value1',
            param2: 'value2'
        });
    });

    it('should reject a promise with original data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAuth = require('./TwitterAuth');

        expect.assertions(1);

        try {

            await TwitterAuth.requestToken();

        } catch (err) {

            expect(err).toEqual('param1=value1&param2=value2');
        }  
    });
});

describe('TwitterAuth.accessToken', () => {

    const authVerifier = 'authVerifier';
    const userSecret = 'user_secret';
    const userToken = 'user_token';

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(TwitterAuth.accessToken({})).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        TwitterAuth.generateAuthHeader = (...params) => JSON.stringify(params);

        TwitterAuth.accessToken({ authVerifier, userSecret, userToken });

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
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

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data parsed to object', async () => {

        expect.assertions(1);

        const data = await TwitterAuth.accessToken({ authVerifier, userSecret, userToken });

        expect(data).toEqual({
            param1: 'value1',
            param2: 'value2'
        });
    });

    it('should reject a promise with original data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAuth = require('./TwitterAuth');

        expect.assertions(1);

        try {

            await TwitterAuth.accessToken({ authVerifier, userSecret, userToken });

        } catch (err) {

            expect(err).toEqual('param1=value1&param2=value2');
        }
    });
});