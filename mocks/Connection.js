module.exports = {

    success: class Connection {

        static sendHttpsRequest({ path }) {

            return Promise.resolve(
                path.startsWith('/oauth') ?
                    'param1=value1&param2=value2' :
                    { param1: 'value1', param2: 'value2' }
            );
        }
    },

    error: class Connection {

        static sendHttpsRequest({ path }) {

            return Promise.reject(
                path.startsWith('/oauth') ?
                    'param1=value1&param2=value2' :
                    { param1: 'value1', param2: 'value2' }
            );
        }
    }
};