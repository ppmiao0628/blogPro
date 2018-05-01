const express = require('express');

module.exports = function () {
    let router = express.Router();

    router.get('/', function (req, res) {
        res.send('web').end();
    });

    return router;
};