const express = require('express');
const expressStatic = require('express-static');
const mysql = require('mysql');
const multer = require('multer');
const multerObj = multer({dest: './static/upload'});
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const expressRoute = require('express-route');
const bodyParser = require('body-parser');

let server = express();
server.listen(8090);

// 获取请求数据
//get
server.use(bodyParser.urlencoded());
server.use(multerObj.any());
// 获取cookie、session
server.use(cookieParser());
(function () {
    let keys = [];
    for (let i = 0; i < 100000; i++) {
        keys[i] = 'a_' + Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 1000
    }));
})();

// 模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

// route
server.use('/', require('./route/web.js')());
server.use('/admin', require('./route/admin.js')());


// default、static
server.use(expressStatic('./static/'));