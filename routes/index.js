var express = require('express');
var crypto = require('crypto');
var studentModel = require('../models/student.js')
var mongoose = require('mongoose');


module.exports = function(app) {  
    //判断是否登录
    app.get('/', function(req, res) {
        if(! req.session.user) {
            return res.redirect('login');
        }else{
            return res.render('index', {});
        }
    });

    //登录
    app.get('/login', function(req, res){
        return res.render('login', {});
    });

    app.post('/login', function(req, res){
        var md5 = crypto.createHash('md5');

        var username = req.body.username;
        var password = req.body.password;

        if (username === 'admin' && password === '123456') {
            //在session中存入用户信息
            req.session.user = {
                username: username
            };
            req.flash('success', '登录成功');
            return res.redirect('/');
        }
        req.flash('error','请确定用户名或密码是否正确' );
        return res.redirect('login');
    });

    //退出
   app.get('/logout', function(req, res) {
         req.session.user = null;
         return res.redirect('/');
   });

   //信息界面
    app.get('/edit',function (req, res){

            return  res.render('edit', {
                name: "人员管理"
            });
    });
 
   //数据显示查找
   app.get('/api/edit',function (req, res){
       var data = {};
       var query = {};
       req.query.name && ( query.name = req.query.name );
       req.query.sex  && ( query.sex = req.query.sex );
       req.query.age  && ( query.age = req.query.age );
       req.query.tel  && ( query.tel = req.query.tel );

       studentModel.find(query, function(err, result) {
           if(err){
               console.log(err, 'find error');
           }
           data.flag = true;
           data.item = result;
           res.send(data);          
       });

   });

   //添加
  app.post('/api/add', function (req, res) {
    const data = {};
    const studentEntity = new studentModel(req.body);
    studentEntity.save().then(function () {
      data.flag = true;
      res.send(data);
    }).catch(function(e) {
      data.msg = e;
      res.send(data);
    });
  });

   //删除
   app.get('/api/del', function(req, res) {
        var result = {};
        var id = req.query.id;
        studentModel.remove({_id:id}, function() {
            result.flag = true;
            res.send(result);
        });
   });

   //更新页面回写数据
   app.post('/api/rewrite', function(req,res){
       var id = req.query.id;
       var data = {};
       studentModel.find({_id:id}, function(err, result) {
           if(err){
               console.log(err, 'find error');
           }
           data.flag = true;
           data.item = result;
           res.send(data)
           });
   });
  //更新
   app.post('/api/update', function(req, res){
       var data = {};
       var conditions = req.query.id;
       var update = {$set: {name: req.body.name,
                            sex: req.body.sex,
                            age: req.body.age,
                            tel: req.body.tel
       }};
       var options = {multi: true};
       studentModel.update({_id:conditions}, update, options,function(err,result) {
           if(err) {
               console.log(err, 'update error');
           }
           data.flag = true;
           data.item = result;
           res.send(data);
       });
   });
};

