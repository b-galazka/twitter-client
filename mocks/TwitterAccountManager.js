module.exports = {

    success: class TwitterAccountManager {

        updateStatus(params) {

            return Promise.resolve('twitter res');
        }

        getTweets(params) {

            return Promise.resolve('twitter res');
        }

        getFollowers(params) {

            return Promise.resolve('twitter res');
        }

        getFriends(params) {

            return Promise.resolve('twitter res');
        }

        getProfileInfo() {

            return Promise.resolve('twitter res');
        }
    },

    internalError: class TwitterAccountManager {

        updateStatus(params) {

            return Promise.reject(new Error());
        }

        getTweets(params) {

            return Promise.reject(new Error());
        }

        getFollowers(params) {

            return Promise.reject(new Error());
        }

        getFriends(params) {

            return Promise.reject(new Error());
        }

        getProfileInfo() {

            return Promise.reject(new Error());
        }
    },

    error: class TwitterAccountManager {

        updateStatus(params) {

            return Promise.reject({ statusCode: 400, res: 'error' });
        }

        getTweets(params) {

            return Promise.reject({ statusCode: 400, res: 'error' });
        }

        getFollowers(params) {

            return Promise.reject({ statusCode: 400, res: 'error' });
        }

        getFriends(params) {

            return Promise.reject({ statusCode: 400, res: 'error' });
        }

        getProfileInfo() {

            return Promise.reject({ statusCode: 400, res: 'error' });
        }
    }
};