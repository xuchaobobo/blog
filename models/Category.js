/**
 * Created by MBENBEN on 2017/6/17.
 */
var mongoose=require('mongoose');
var categoriesSchema=require('../schemas/categories');
module.exports=mongoose.model('Category',categoriesSchema);
