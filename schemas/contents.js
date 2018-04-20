/**
 * Created by MBENBEN on 2017/6/17.
 */
var mongoose=require('mongoose');
//内容表结构
module.exports=new mongoose.Schema({
    //关联字段
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //关联字段用户
    user:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //时间
    addTime:{
        type:Date,
        default:new Date()
    },
    //点击量
    views:{
        type:Number,
        default:0
    },
    //内容标题名
    title:String,
    //内容简介
    description:{
        type:String,
        default:''
    },
    //内容
    content:{
        type:String,
        default:''
    },
    //评论
    comments:{
        type:Array,
        default:[]
    }

})
