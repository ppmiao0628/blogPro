const express = require('express');

module.exports = function () {
    let router = express.Router();

    router.get('/1.html', function (req, res) {
        res.send('b1').end();
    });
    router.get('/2.html', function (req, res) {
        res.send('b2').end();
    });

    return router;
};