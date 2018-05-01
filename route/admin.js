const express = require('express');
const common = require('../libs/common');

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
    router.use('/login', function (req, res) {
        console.log(req.body);
        res.render('admin/login.ejs', {});
    });

    return router;
};