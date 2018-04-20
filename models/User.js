/**
 * Created by MBENBEN on 2017/6/17.
 */
var mongoose=require('mongoose');
var userSchema=require('../schemas/users');
module.exports=mongoose.model('User',userSchema);
