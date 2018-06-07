const EventEmitter = require('events');

class Response extends EventEmitter {

    constructor(data, statusCode) {

        super();

        this._data = data;
        this.statusCode = statusCode;
    }

    startSendingData() {

        for (const chunk of this._data) {

            setImmediate(() => this.emit('data', chunk));
        }

        setImmediate(() => this.emit('end'));
    }
}

class Request extends EventEmitter {

    constructor(response) {

        super();

        this._response = response;
    }

    end() {

        if (this._response) {

            this._response.startSendingData();

        } else {

            setImmediate(
                () => this.emit('error', new Error('internal server error'))
            );

        }

        return this;
    }
}

module.exports =  {

    request({ method }, callback ) {

        let response;

        if (method !== 'error') {

            response = new Response(
                'abcdef',
                (method === 'status error') ? 400 : 200
            );

            setImmediate(() => callback(response));
        }

        return new Request(response);
    }
}