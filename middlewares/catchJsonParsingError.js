module.exports = function catchJsonParsingError(err, req, res, next) {

    console.error(err);

    return res.status(500).send({
        message: 'invalid JSON format'
    });
};