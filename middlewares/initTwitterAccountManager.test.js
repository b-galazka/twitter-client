const initTwitterAccountManager = require('./initTwitterAccountManager');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');
const TwitterAccountManager = require('../tools/TwitterAccountManager');

const req = new ExpressRequest();
const res = new ExpressResponse();

describe('initTwitterAccountManager', () => {

    it('should create instace of TwitterAccountManager ' +
        'and save it at req.twitterAccountManager', () => {

        const next = jest.fn();

        initTwitterAccountManager(req, res, next);

        expect(req.twitterAccountManager).toBeInstanceOf(TwitterAccountManager);
    });

    it('should create instace of TwitterAccountManager with data from cookies', () => {

        const twitterKey = 'key';
        const twitterSecret = 'secret';

        const req = new ExpressRequest({
            cookies: { twitterKey, twitterSecret  }
        });

        const next = jest.fn();

        initTwitterAccountManager(req, res, next);

        const { twitterAccountManager } = req;

        expect(twitterAccountManager).toHaveProperty('_userToken', twitterKey);
        expect(twitterAccountManager).toHaveProperty('_userTokenSecret', twitterSecret);
    });

    it('should response with JSON message "invalid JSON format" ', () => {

        const next = jest.fn();

        initTwitterAccountManager(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });
});