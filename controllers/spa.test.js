const path = require('path');

const spaController = require('./spa');
const ExpressRequest = require('../mocks/ExpressRequest');
const ExpressResponse = require('../mocks/ExpressResponse');

const req = new ExpressRequest();
const res = new ExpressResponse();

describe('spaController', () => {

    it('should respond with SPA dev HTML file in non-production enviroment', () => {
    
        const spy = jest.spyOn(ExpressResponse.prototype, 'sendFile');

        spaController(req, res);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenLastCalledWith(
            path.resolve(__dirname, '../frontend/src/index.html')
        );

        spy.mockReset();
        spy.mockRestore();
    });

    it('should respond with SPA prod HTML file in production enviroment', () => {

        const spy = jest.spyOn(ExpressResponse.prototype, 'sendFile');

        process.env.NODE_ENV = 'production';

        spaController(req, res);

        process.env.NODE_ENV = 'test';

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenLastCalledWith(
            path.resolve(__dirname, '../frontend/dist/index.html')
        );

        spy.mockReset();
        spy.mockRestore();
    });
});