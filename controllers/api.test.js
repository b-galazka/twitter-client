const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');
const apiControllers = require('./api');
const TwitterAccountManager = require('../tools/TwitterAccountManager');

const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
const res = new ExpressResponse();

jest.mock(
    '../tools/TwitterAccountManager',
    () => require('../mocks/TwitterAccountManager').success
);

describe('apiControllers.updateStatus', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAccountManager');
        jest.resetModules();
    });

    it('should call TwitterAccountManager.prototype.updateStatus with req.body', () => {

        const reqBody = { field: 'value' };

        const req = new ExpressRequest({
            body: reqBody,
            twitterAccountManager: new TwitterAccountManager()
        });

        const spy = jest.spyOn(TwitterAccountManager.prototype, 'updateStatus');

        apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(reqBody);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set proper Content-Type header', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'set');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with Twitter response', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('twitter res');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong"' +
        'if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper status if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(400);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper JSON message if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.updateStatus(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'error' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('apiControllers.getTweets', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAccountManager');
        jest.resetModules();
    });

    it('should call TwitterAccountManager.prototype.getTweets with req.query', () => {

        const reqQuery = { field: 'value' };

        const req = new ExpressRequest({
            query: reqQuery,
            twitterAccountManager: new TwitterAccountManager()
        });

        const spy = jest.spyOn(TwitterAccountManager.prototype, 'getTweets');

        apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(reqQuery);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set proper Content-Type header', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'set');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with Twitter response', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('twitter res');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong"' +
        'if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper status if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(400);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper JSON message if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getTweets(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'error' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('apiControllers.getFollowers', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAccountManager');
        jest.resetModules();
    });

    it('should call TwitterAccountManager.prototype.getFollowers with req.query', () => {

        const reqQuery = { field: 'value' };

        const req = new ExpressRequest({
            query: reqQuery,
            twitterAccountManager: new TwitterAccountManager()
        });

        const spy = jest.spyOn(TwitterAccountManager.prototype, 'getFollowers');

        apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(reqQuery);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set proper Content-Type header', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'set');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with Twitter response', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('twitter res');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong"' +
        'if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper status if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(400);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper JSON message if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFollowers(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'error' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('apiControllers.getFriends', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAccountManager');
        jest.resetModules();
    });

    it('should call TwitterAccountManager.prototype.getFriends with req.query', () => {

        const reqQuery = { field: 'value' };

        const req = new ExpressRequest({
            query: reqQuery,
            twitterAccountManager: new TwitterAccountManager()
        });

        const spy = jest.spyOn(TwitterAccountManager.prototype, 'getFriends');

        apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(reqQuery);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set proper Content-Type header', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'set');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with Twitter response', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('twitter res');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong"' +
        'if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper status if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(400);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper JSON message if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getFriends(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'error' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('apiControllers.getProfile', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAccountManager');
        jest.resetModules();
    });

    it('should call TwitterAccountManager.prototype.getProfile with req.query', () => {

        const reqQuery = { field: 'value' };

        const req = new ExpressRequest({
            query: reqQuery,
            twitterAccountManager: new TwitterAccountManager()
        });

        const spy = jest.spyOn(TwitterAccountManager.prototype, 'getProfileInfo');

        apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(reqQuery);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set proper Content-Type header', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'set');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with Twitter response', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('twitter res');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong"' +
        'if internal error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').internalError
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper status if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(400);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with proper JSON message if error occured', async () => {

        jest.mock(
            '../tools/TwitterAccountManager',
            () => require('../mocks/TwitterAccountManager').error
        );

        expect.assertions(2);

        const apiControllers = require('./api');
        const TwitterAccountManager = require('../tools/TwitterAccountManager');
        const req = new ExpressRequest({ twitterAccountManager: new TwitterAccountManager() });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await apiControllers.getProfile(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'error' });

        spy.mockReset();
        spy.mockRestore();
    });
});