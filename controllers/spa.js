const path = require('path');

module.exports = function spaController(req, res) {

    const { NODE_ENV } = process.env;
    const rootSpaDir = (NODE_ENV === 'production') ? 'dist' : 'src';

    res.sendFile(path.resolve(__dirname, `../frontend/${rootSpaDir}/index.html`));
}