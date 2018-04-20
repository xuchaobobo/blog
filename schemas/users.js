/**
 * Created by MBENBEN on 2017/6/17.
 */
var mongoose=require('mongoose');
//用户表结构
module.exports=new mongoose.Schema({
    //用户名
    username:String,
    //密码
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
})
