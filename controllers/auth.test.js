const authControllers = require('./auth');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');
const TwitterAuth = require('../tools/TwitterAuth');

const req = new ExpressRequest();
const res = new ExpressResponse();

jest.mock('../tools/TwitterAuth', () => require('../mocks/TwitterAuth').success);

describe('authControllers.getAuthUrl', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAuth');
        jest.resetModules();
    });

    it('should set token secret as httpOnly cookie', async () => {

        expect.assertions(1);

        const spy = jest.spyOn(ExpressResponse.prototype, 'cookie');

        await authControllers.getAuthUrl(req, res);

        expect(spy).toHaveBeenCalledWith('twitterSecret', 'secret', { httpOnly: true});

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with auth url', async () => {

        expect.assertions(2);

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await authControllers.getAuthUrl(req, res);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            authUrl: 'https://api.twitter.com/oauth/authorize?oauth_token=token'
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if error occured', async () => {

        jest.mock(
            '../tools/TwitterAuth',
            () => require('../mocks/TwitterAuth').error
        );  

        expect.assertions(2);

        const authControllers = require('./auth');
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await authControllers.getAuthUrl(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong" if error occured', async () => {

        jest.mock(
            '../tools/TwitterAuth',
            () => require('../mocks/TwitterAuth').error
        );

        expect.assertions(2);

        const authControllers = require('./auth');
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await authControllers.getAuthUrl(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('authControllers.auth', () => {

    beforeEach(() => {

        jest.unmock('../tools/TwitterAuth');
        jest.resetModules();
    });

    it('should respond with status 403 if twitter secret is not set in cookies', () => {

        const oauth_verifier = 'verifier';
        const oauth_token = 'token';
        const req = new ExpressRequest({ query: { oauth_verifier, oauth_token }});
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(403);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 403 if required URL variables are not provided', () => {

        const twitterSecret = 'secret';
        const req = new ExpressRequest({ cookies: { twitterSecret } });
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(403);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "missing credentials" '+
        'if twitter secret is not set in cookies', () => {

        const oauth_verifier = 'verifier';
        const oauth_token = 'token';
        const req = new ExpressRequest({ query: { oauth_verifier, oauth_token } });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'missing credentials'});

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "missing credentials" ' +
        'if required URL variables are not provided', () => {

        const twitterSecret = 'secret';
        const req = new ExpressRequest({ cookies: { twitterSecret } });
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'missing credentials' });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should call TwitterAuth.accessToken with data from cookies and URL', () => {

        const twitterSecret = 'secret';
        const oauth_verifier = 'verifier';
        const oauth_token = 'token';

        const req = new ExpressRequest({
            cookies: { twitterSecret },
            query: { oauth_verifier, oauth_token }
        });

        const spy = jest.spyOn(TwitterAuth, 'accessToken');

        authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            authVerifier: oauth_verifier,
            userToken: oauth_token,
            userSecret: twitterSecret
        });

        spy.mockReset();
        spy.mockRestore();
    });

    it('should set cookies', async () => {

        expect.assertions(4);

        const twitterSecret = 'secret';
        const oauth_verifier = 'verifier';
        const oauth_token = 'token';

        const req = new ExpressRequest({
            cookies: { twitterSecret },
            query: { oauth_verifier, oauth_token }
        });

        const spy = jest.spyOn(ExpressResponse.prototype, 'cookie');

        await authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(3);

        expect(spy).toHaveBeenCalledWith('twitterKey', 'token', { httpOnly: true });
        expect(spy).toHaveBeenCalledWith('twitterSecret', 'secret', { httpOnly: true });
        expect(spy).toHaveBeenCalledWith('authenticated', true);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should redirect to homepage', async () => {

        expect.assertions(2);

        const twitterSecret = 'secret';
        const oauth_verifier = 'verifier';
        const oauth_token = 'token';

        const req = new ExpressRequest({
            cookies: { twitterSecret },
            query: { oauth_verifier, oauth_token }
        });

        const spy = jest.spyOn(ExpressResponse.prototype, 'redirect');

        await authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('/');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with status 500 if error occured', async () => {

        jest.mock(
            '../tools/TwitterAuth',
            () => require('../mocks/TwitterAuth').error
        );

        expect.assertions(2);

        const authControllers = require('./auth');
        const twitterSecret = 'secret';
        const oauth_verifier = 'verifier';
        const oauth_token = 'token';

        const req = new ExpressRequest({
            cookies: { twitterSecret },
            query: { oauth_verifier, oauth_token }
        });

        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        await authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with JSON message "something went wrong" if error occured', async () => {

        jest.mock(
            '../tools/TwitterAuth',
            () => require('../mocks/TwitterAuth').error
        );

        expect.assertions(2);

        const authControllers = require('./auth');
        const twitterSecret = 'secret';
        const oauth_verifier = 'verifier';
        const oauth_token = 'token';

        const req = new ExpressRequest({
            cookies: { twitterSecret },
            query: { oauth_verifier, oauth_token }
        });

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        await authControllers.auth(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'something went wrong' });

        spy.mockReset();
        spy.mockRestore();
    });
});

describe('authControllers.logout', () => {

    it('should clear all auth cookies', () => {

        const spy = jest.spyOn(ExpressResponse.prototype, 'clearCookie');

        authControllers.logout(req, res);

        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalledWith('authenticated');
        expect(spy).toHaveBeenCalledWith('twitterKey');
        expect(spy).toHaveBeenCalledWith('twitterSecret');

        spy.mockReset();
        spy.mockRestore();
    });

    it('should redirect to homepage', () => {

        const spy = jest.spyOn(ExpressResponse.prototype, 'redirect');

        authControllers.logout(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('/');

        spy.mockReset();
        spy.mockRestore();
    });
});