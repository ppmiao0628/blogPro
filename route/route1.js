const express = require('express');

module.exports = function () {
    let router = express.Router();

    router.get('/1.html', function (req, res) {
        // res.send('w1').end();
        res.render('./1.ejs', {title: '标题', a: 21, b: 23});
    });
    router.get('/2.html', function (req, res) {
        res.send('w2').end();
    });

    return router;
};