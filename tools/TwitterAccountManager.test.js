const TwitterAccountManager = require('./TwitterAccountManager');
const TwitterAuth = require('./TwitterAuth');
const Connection = require('./Connection');

const userToken = 'user_token';
const userTokenSecret = 'user_token_secret';
const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

const params = {
    param1: 'value1',
    param2: 'value2'
};

jest.mock('./Connection', () => require('../mocks/Connection').success);
jest.mock('./TwitterAuth', () => require('../mocks/TwitterAuth').success);

describe('TwitterAccountManager._stringifyParams', () => {

    it('should return an empty string if an empty object was provided', () => {

        expect(TwitterAccountManager._stringifyParams({})).toBe('');
    });

    it('should return one param string', () => {

        const paramsStrings = TwitterAccountManager._stringifyParams({
            param1: '#value1'
        });

        expect(paramsStrings).toBe('?param1=%23value1');
    });

    it('should return a params string', () => {

        const paramsStrings = TwitterAccountManager._stringifyParams({
            param1: '#value1',
            param2: '%value2'
        });

        expect(paramsStrings).toBe('?param1=%23value1&param2=%25value2');
    });
});

describe('TwitterAccountManager.prototype.getProfileInfo', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(accountManager.getProfileInfo(params)).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {
 
        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        accountManager.getProfileInfo(params);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/account/verify_credentials.json' + TwitterAccountManager._stringifyParams(params),
            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
                    userSecret: userTokenSecret,
                    userToken: userToken,
                    params
                })
            }
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await accountManager.getProfileInfo(params);

        expect(data).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should reject a promise with data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAccountManager = require('./TwitterAccountManager');
        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

        expect.assertions(1);

        try {

            await accountManager.getProfileInfo(params);

        } catch (err) {

            expect(err).toEqual({ param1: 'value1', param2: 'value2' });
        }
    });
});

describe('TwitterAccountManager.prototype.getFriends', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(accountManager.getFriends(params)).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        accountManager.getFriends(params);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/friends/list.json' + TwitterAccountManager._stringifyParams(params),
            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/friends/list.json',
                    userSecret: userTokenSecret,
                    userToken: userToken,
                    params
                })
            }
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await accountManager.getFriends(params);

        expect(data).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should reject a promise with data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAccountManager = require('./TwitterAccountManager');
        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

        expect.assertions(1);

        try {

            await accountManager.getFriends(params);

        } catch (err) {

            expect(err).toEqual({ param1: 'value1', param2: 'value2' });
        }
    });
});

describe('TwitterAccountManager.prototype.getFollowers', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(accountManager.getFollowers(params)).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });
        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        accountManager.getFollowers(params);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/followers/list.json' + TwitterAccountManager._stringifyParams(params),
            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/followers/list.json',
                    userSecret: userTokenSecret,
                    userToken: userToken,
                    params
                })
            }
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await accountManager.getFollowers(params);

        expect(data).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should reject a promise with data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAccountManager = require('./TwitterAccountManager');
        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

        expect.assertions(1);

        try {

            await accountManager.getFollowers(params);

        } catch (err) {

            expect(err).toEqual({ param1: 'value1', param2: 'value2' });
        }
    });
});

describe('TwitterAccountManager.prototype.getTweets', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(accountManager.getTweets(params)).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });
        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        accountManager.getTweets(params);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            method: 'GET',
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json' + TwitterAccountManager._stringifyParams(params),
            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                    userSecret: userTokenSecret,
                    userToken: userToken,
                    params
                })
            }
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await accountManager.getTweets(params);

        expect(data).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should reject a promise with data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAccountManager = require('./TwitterAccountManager');
        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

        expect.assertions(1);

        try {

            await accountManager.getTweets(params);

        } catch (err) {

            expect(err).toEqual({ param1: 'value1', param2: 'value2' });
        }
    });
});

describe('TwitterAccountManager.prototype.updateStatus', () => {

    beforeEach(() => {

        jest.unmock('./Connection');
        jest.resetModules();
    });

    it('should return a promise', () => {

        expect(accountManager.updateStatus(params)).toBeInstanceOf(Promise);
    });

    it('should call Connection.sendHttpsRequest() one time with proper params', () => {

        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });
        const spy = jest.spyOn(Connection, 'sendHttpsRequest');

        accountManager.updateStatus(params);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            method: 'POST',
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/update.json' + TwitterAccountManager._stringifyParams(params),
            headers: {
                Authorization: TwitterAuth.generateAuthHeader({
                    method: 'POST',
                    url: 'https://api.twitter.com/1.1/statuses/update.json',
                    userSecret: userTokenSecret,
                    userToken: userToken,
                    params
                })
            }
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await accountManager.updateStatus(params);

        expect(data).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should reject a promise with data if error occured', async () => {

        jest.mock(
            './Connection',
            () => require('../mocks/Connection').error
        );

        const TwitterAccountManager = require('./TwitterAccountManager');
        const accountManager = new TwitterAccountManager({ userToken, userTokenSecret });

        expect.assertions(1);

        try {

            await accountManager.updateStatus(params);

        } catch (err) {

            expect(err).toEqual({ param1: 'value1', param2: 'value2' });
        }
    });
});