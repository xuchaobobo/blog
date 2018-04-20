/**
 * Created by MBENBEN on 2017/6/17.
 */
var express=require('express');
var router = express.Router();
var User=require('../models/User');
var Content=require('../models/Content');
//统一返回格式
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0,
        message:''
    }
    next();
});
//用户注册
router.post('/user/register',function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;
    if(username==''){
        responseData.code=1;
        responseData.message='用户名不能为空';
        res.json(responseData);
        return;
    }
    if(password==''){
        responseData.code=2;
        responseData.message='密码不能为空';
        res.json(responseData);
        return;
    }
    if(password!=repassword){
        responseData.code=3;
        responseData.message='两次密码输入不一致';
        res.json(responseData);
        return;
    }
    User.findOne({
        username:username
    }).then(function(userInfor){
        if(userInfor){
            responseData.code=4;
            responseData.message='该用户已经被注册了';
            res.json(responseData);
            return;
        }
        var user=new User({
            username:username,
            password:password
        });
        return user.save()
    }).then(function(newUserInfo){
        responseData.message='注册成功';
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));

        res.json(responseData);
    });
    next();
});
router.post('/user/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    if(username=='' || password==''){
        responseData.code=1;
        responseData.message='用户名或密码不能为空'
    }
    //查询数据库中相同用户名的密码的记录是否存在，如果存在即登陆成功
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code=2;
            responseData.message='用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message='登陆成功';
        responseData.userInfo={
            _id:userInfo._id,
            username:userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));
        res.json(responseData);
        return;
    })
});
//退出
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    res.json(responseData);
    return;
});
/*
* 显示全部*/
router.get('/comment',function(req,res){
    var contentId = req.query.contentId ||'';
    Content.findOne({
        _id:contentId
    }).then(function(content){
        responseData.data=content.comments;
        res.json(responseData);

    })
});
/*
* 留言评论提交*/
router.post('/comment/post', function (req,res) {
    //内容Id
    var contentId = req.body.contentId ||'';
    var postData={
        username:req.userInfo.username,
        postTime:new Date(),
        content:req.body.content
    }
    Content.findOne({
        _id:contentId
    }).then(function(content){
        content.comments.push(postData);
        return content.save();
    }).then(function(newContent){
        responseData.message='评论成功';
        responseData.data=newContent;
        res.json(responseData);

    })
})
module.exports=router;
