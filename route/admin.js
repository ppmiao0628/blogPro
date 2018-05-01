const express = require('express');

module.exports = function () {
    let router = express.Router();

    router.get('/', function (req, res) {
        res.send('admin').end();
    });

    return router;
};