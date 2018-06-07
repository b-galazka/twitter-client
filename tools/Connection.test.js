const https = require('https');

const Connection = require('./Connection');

jest.mock('https', () => require('../mocks/https'));

describe('Connection.sendHttpsRequest', () => {

    it('should return a promise', () => {

        expect(Connection.sendHttpsRequest({})).toBeInstanceOf(Promise);
    });

    it('should call https.request with proper arguments', () => {

        const spy = jest.spyOn(https, 'request');

        const method = 'GET';
        const hostname = 'example.com';
        const path = '/data';
        const headers = { Authorization: 'token' };

        Connection.sendHttpsRequest({ method, hostname, path, headers });

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).toHaveBeenCalledWith(
            { port: 443, hostname, path, method, headers },
            expect.any(Function)
        );

        spy.mockReset();
        spy.mockRestore();
    });

    it('should resolve a promise with data', async () => {

        expect.assertions(1);

        const data = await Connection.sendHttpsRequest({ method: 'success' });

        expect(data).toBe('abcdef');
    });

    it('should reject a promise with an error if internal server error occured', async () => {

        expect.assertions(2);

        try {

            await Connection.sendHttpsRequest({ method: 'error' });

        } catch (err) {

            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('internal server error');
        }
    });

    it('should reject a promise if res.statusCode >= 400', async () => {

        expect.assertions(1);

        const method = 'status error';
        const hostname = 'example.com';
        const path = '/data';

        try {

            await Connection.sendHttpsRequest({ method, hostname, path });

        } catch (err) {

            expect(err).toEqual({
                url: hostname + path,
                res: 'abcdef',
                method,
                statusCode: 400
            });
        }
    });
});