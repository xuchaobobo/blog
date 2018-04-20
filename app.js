/**
 * Created by MBENBEN on 2017/6/16.
 * 应用文件入库启动文件
 */
    //加载express模块
var express = require('express');
//加载模板处理模块
var swig=require('swig');
//加载数据库模块
var mongoose=require('mongoose');
//加载body-parser，用了处理post提交的数据
var bodyParser=require('body-parser');
//加载cookies模块
var Cookies=require('cookies');
//创建app应用
var app=express();
var User=require('./models/User');
//设置静态资源文件托管，当用户访问url以public开始时，那么直接返回对应的__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));
//配置应用模板
app.engine('html',swig.renderFile);
//设置存放目录
app.set('views','./views');
/*注册所用模板*/
app.set('view engine','html');
/*开发过程中去掉模板缓存*/
swig.setDefaults({cache:false});

//设置bodyparser
app.use(bodyParser.urlencoded({extended:true}));
//设置cookies
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res);
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));
            //获取当前用户登录的类型 是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                next();
            })

        }catch (e){
            next();
        }
    }else{
        next();
    }

})
/*
 * 根据不同功能划分模块
 * */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));
mongoose.connect('mongodb://localhost:27018/blog',function(err){
    if(err){
        console.log('数据库链接失败')
    }else{
        console.log('数据库成功')
        //监听请求
        app.listen(8081);
    }
});

