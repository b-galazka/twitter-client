module.exports = function notFoundController(req, res) {

    res.status(404).send({
        message: 'not found'
    });
}