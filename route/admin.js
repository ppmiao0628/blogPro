const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

let db = mysql.createPool({host: 'localhost', user: 'root', password: 'ppm', database: 'blogdatabase'});

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

    router.use('/login', function (req, res) {
        // console.log(req.body);
        let username = req.body.username;
        let password = common.md5(req.body.password);
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                res.status(500).send('database error').end();
            } else {
                if (data.length > 0) {
                    if (data[0].password == password){
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    } else {
                        res.status(400).send('password is wrong').end();
                    }
                } else {
                    res.status(502).send('database is null').end();
                }
            }
        });
    });
    router.get('/',(req, res) => {
        res.render('admin/index.ejs',{});
    });
    router.get('/banners', (req, res)=>{
        let bannerObj = {};
        db.query(`SELECT * FROM banner_table`,(err, data)=>{
            if (err){
                console.error(err);
                res.status(500).send('database query err').end();
            } else {
                if (data.length>0){
                    bannerObj = data;
                } else {
                    res.status(200).send('database is null').end();
                }
                res.render('admin/banner.ejs', {bannerObj:bannerObj});
            }
        });
    });
    router.post('/banners', (req, res)=>{
        // res.send(req.body).end();
        let title = req.body.title;
        let description = req.body.description;
        let href = req.body.href;
        if (!title || !description || !href) {
            res.status(400).send('arg err').end();
        } else {
            db.query(`INSERT INTO banner_table (title,description,href) VALUE ('${title}','${description}','${href}')`,(err, data)=>{
                if (err){
                    console.error('this is err:'+err);
                    res.status(500).send('database insert err').end();
                } else {
                    res.redirect('/admin/banners');
                }
            });
        }
    });

    return router;
};