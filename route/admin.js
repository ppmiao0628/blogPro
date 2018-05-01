const express = require('express');

module.exports = function () {
    let router = express.Router();

    // router.get('/', function (req, res) {
    //     res.send('admin').end();
    // });
    // 检查登录态
    router.use((req, res, next) => {
        if (!req.session['admin_id'] && req.url != '/login') {
            // 重定向登录
            res.redirect('/admin/login');
        } else {
            next();
        }
    });
    router.get('/login', function (req, res) {
        res.render('admin/login.ejs', {});
    });

    return router;
};