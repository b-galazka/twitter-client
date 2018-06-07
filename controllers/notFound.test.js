const notFoundController = require('./notFound');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');

const req = new ExpressRequest();
const res = new ExpressResponse();

describe('notFound controller', () => {

    it('should response with status 404', () => {
 
        const spy = jest.spyOn(ExpressResponse.prototype, 'status');

        notFoundController(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(404);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should response with JSON message "not found', () => {

        const spy = jest.spyOn(ExpressResponse.prototype, 'send');

        notFoundController(req, res);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'not found' });

        spy.mockReset();
        spy.mockRestore();
    });
});