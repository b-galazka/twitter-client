class ExpressRequest {

    constructor({
        cookies = {},
        body = {},
        twitterAccountManager = {},
        query = {}
    } = {}) {

        this.cookies = cookies;
        this.body = body;
        this.twitterAccountManager = twitterAccountManager;
        this.query = query
    }
}

module.exports = ExpressRequest;