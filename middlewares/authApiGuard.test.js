const authApiGuard = require('./authApiGuard');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');

const req = new ExpressRequest();
const res = new ExpressResponse();

describe('authApiGuard', () => {

    it('should call next() if twitterKey and twitterSecret are saved in cookies', () => {

        const req = new ExpressRequest({
            cookies: { twitterKey: 'key', twitterSecret: 'secret' }
        });

        const next = jest.fn();

        authApiGuard(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should response with status 403 if twitterKey or twitterSecret ' +
        'is not saved in cookies', () => {

        const next = jest.fn();
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        authApiGuard(req, res, next);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(403);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should response with JSON message "authentication required" ' +
        'if twitterKey or twitterSecret is not saved in cookies', () => {

        const next = jest.fn();
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        authApiGuard(req, res, next);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            message: 'authentication required'
        });

        spy.mockReset();
        spy.mockRestore();
    });
});