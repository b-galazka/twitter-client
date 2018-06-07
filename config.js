const configureDotenv = require('./functions/configureDotenv');

configureDotenv();

const {
    PORT,
    IP,
    TWITTER_SECRET,
    TWITTER_KEY
} = process.env;

module.exports = {

    port: +PORT || 3000,
    ip: IP || '127.0.0.1',
    twitterKey: TWITTER_KEY || '',
    twitterSecret: TWITTER_SECRET || ''
};