
/**
 * Created by MBENBEN on 2017/6/23.
 */
$(function () {
    var longinBox=$("#longinBox");
    var registerBox=$("#registerBox");
    var userInfo=$("#userInfo");
    //切换到注册页面
    longinBox.find('a.colMint').on('click', function () {
        registerBox.show();
        longinBox.hide();
    });
    //切换到登陆面板
    registerBox.find('a.colMint').on('click', function () {
        longinBox.show();
        registerBox.hide();
    });
    //注册
    registerBox.find('button').on('click', function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username: registerBox.find('input[name="username"]').val(),
                password: registerBox.find('input[name="password"]').val(),
                repassword:registerBox.find('input[name="repassword"]').val()
            },
            dataType:'json',
            success: function (data) {
                registerBox.find('.conWarning').html(data.message);
                if(!data.code){
                    setTimeout(function(){
                        longinBox.show();
                        registerBox.hide();

                    },1000)
                }
            }


        })
    });
    //登陆
    longinBox.find('button').on('click', function () {
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username: longinBox.find('input[name="username"]').val(),
                password: longinBox.find('input[name="password"]').val(),
            },
            dataType:'json',
            success: function (result) {
                longinBox.find('.conWarning').html(result.message);
                if(!result.code){
                   //登录成功
                    window.location.reload()
                }
            }
    })
    })
    $('#logout').on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            success: function (data) {
                if(!data.code){
                    window.location.reload()
                }
            }
        })
    })
})
