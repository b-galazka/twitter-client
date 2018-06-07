const catchJsonParsingError = require('./catchJsonParsingError');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');

const req = new ExpressRequest();
const res = new ExpressResponse();

describe('catchJsonParsingError', () => {

    it('should response with status 500', () => {
    
        const next = jest.fn();
        const error = new Error();
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        catchJsonParsingError(error, req, res, next);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should response with JSON message "invalid JSON format" ', () => {

        const next = jest.fn();
        const error = new Error();
        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        catchJsonParsingError(error, req, res, next);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith({
            message: 'invalid JSON format'
        });

        spy.mockReset();
        spy.mockRestore();
    });
});