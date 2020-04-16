const express = require("express");
const mongo = require("mongodb").MongoClient;
const queryString = require("querystring");//用于解析post请求的参数
const util = require("./server_util.js");
const app = express();

const {successDate} = util;
//添加跨域访问
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})

var url = "mongodb://192.168.40.20:27017/";

//注册添加账号
app.get('/addAccount', function (req, resp) {
    //创建数据集合
    var obj = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        sex: req.query.sex,
        age: req.query.age
    };
    var isHad = false;
    mongo.connect(url, function (err, db) {
        if (err) {
            resp.send(successDate(err, 400));
        }
        //连接数据库
        var dbo = db.db("mongoNode").collection("account");
        //先查找用户名有没有被注册
        dbo.find({ username: obj.username }).toArray(function (err, result) {
            if (err) {
                resp.send(successDate(err, 400));
            }
            if (result != null && result.length > 0) {
                isHad = true;
            }
            // 如果被注册直接返回注册失败
            if (isHad) {
                resp.send(successDate("该账号已被注册", 400));
            } else {
                //如果没有被注册,就插入一条注册信息
                dbo.insertOne(obj, function (err, res) {
                    if (err) {
                        db.close();
                        resp.send(successDate(err, 400));
                    }else {
                        resp.send(successDate("注册成功", 200));
                    }
                })
            }
            db.close();
        })
    })
})

//登录接口,会判断账号是否存在
app.post("/login", function(req, res) {

    var query = "";//用于存放参数
    req.addListener('data', function (data) {
        query += data;
    })
    
    //如果接收数据完毕
    req.addListener('end', function () {
        //将接收的字符串解析为对象
        /* 仅支持content-type : "application/x-www-form-urlencoded" 
            var params = queryString.parse(query); */
        var params = JSON.parse(query);
        
        mongo.connect(url, function (err, db) {
            if(err) {
                return res.send(successDate(err, 400));
            }
            var dbo = db.db("mongoNode").collection("account");
            dbo.find({username: params.username, password: params.password}).toArray(function (err, result) {
                if(err) {
                    return res.send(successDate(err, 400));
                }
                if(result != null && result.length > 0) {
                    return res.send(successDate("登录成功", 200));
                }else {
                    return res.send(successDate("用户名或密码不正确", 400));
                }
            })
            db.close();
        })
    })
})

var server = app.listen(5000, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例访问地址为：http://%s:%s", host, port);
})