var settings = require('../settings');
var mongoose = require('mongoose');
    mongoose.connect("mongodb://"+settings.host+"/"+settings.db);
var  db=mongoose.connection;//创建一个数据库连接
     db.on('error', console.error.bind(console, 'connection error:'));
     db.once('open', function() {
         console.log('数据库链接成功')
     });
module.exports = {
    "dbCon":db,
    "mongoose":mongoose
};