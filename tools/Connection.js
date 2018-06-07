const https = require('https');

class Connection {

    static sendHttpsRequest({ method, hostname, path, headers = {} }) {

        return new Promise((resolve, reject) => {

            const reqOptions = {
                port: 443,
                hostname,
                path,
                method,
                headers
            };

            const req = https.request(reqOptions, (res) => {

                let data = '';

                res.on('data', (chunk) => { data += chunk });

                res.on('end', () => {

                    const { statusCode } = res;

                    if (statusCode >= 400) {

                        return reject({
                            url: hostname + path,
                            res: data,
                            method,
                            statusCode
                        });
                    }

                    resolve(data);
                });
            });

            req.on('error', err => reject(err));
            req.end();
        });
    }
}

module.exports = Connection;