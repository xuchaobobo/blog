/**
 * Created by XCB on 2017/7/18.
 */
var prepage=10;
var page=1;
var pages = 0;
var comments = [];
$('#messageBtn').on('click',function(){
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentId:$('#contentId').val(),
            content:$('#messageContent').val()
        },
        success:function(responseData){
          $('#messageContent').val('');
            comments=responseData.data.comments.reverse()
            renderComment();
        }
    })
});
$.ajax({
    url:'/api/comment',
    data:{
        contentId:$('#contentId').val()
    },
    success:function(responseData){
        comments=responseData.data.reverse();
        renderComment();
    }
});
$(".pager").delegate('a','click',function(){
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
})
function formatDate(d){
    var data1 = new Date(d);
    return data1.getFullYear()+'年'+(data1.getMonth()+1)+'月'+data1.getDate()+'日'+data1.getHours()+'：'+data1.getMinutes()+'：'+data1.getSeconds()
}

function renderComment(){
    $("#messageCount").html(comments.length);
    var $lis = $('.pager li');
    var start=Math.max(0,(page-1)*prepage);
    var end=Math.min(start+prepage,comments.length);
    pages = Math.max(Math.ceil(comments.length/prepage),1);
    $lis.eq(1).html(page+'/'+pages);
    if(page<=1){
        page=1;
        $lis.eq(0).html('<span>没有上一页了</span>')
    }else{
        $lis.eq(0).html(' <a href="javascript:;">上一页</a>')
    }
    if(page>=pages){
        page=pages;
        $lis.eq(2).html('<span>没有下一页了</span>')
    }else{
        $lis.eq(2).html('<a href="javascript:;">下一页</a>')
    }
    if(comments.length==0){
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>')
    }else{
        var html = '';

        for(var i=start;i<end;i++){
            html+='<div class="messageBox">'+
                '<p class="name clear"><span class="fl">'+comments[i].username+'</span><span class="fr">'+formatDate(comments[i].postTime)+'</span>'+comments[i].content+'</p>'+
                '</div>'

        }
        $('.messageList').html(html);
    }

}
