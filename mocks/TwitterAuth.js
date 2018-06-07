module.exports = {

    success: class TwitterAuth {

        static generateAuthHeader(...params) {

            return JSON.stringify(params);
        }

        static requestToken() {

            return Promise.resolve({
                oauth_token_secret: 'secret',
                oauth_token: 'token'
            });
        }

        static accessToken() {

            return Promise.resolve({
                oauth_token_secret: 'secret',
                oauth_token: 'token'
            });
        }
    },

    error: class TwitterAuth {

        static generateAuthHeader() {

            return JSON.stringify(params);
        }

        static requestToken() {

            return Promise.reject('error');
        }

        static accessToken() {

            return Promise.reject('error');
        }
    }
};