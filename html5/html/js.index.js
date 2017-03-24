window.onload=function(){
   //个人中心，移入移出显示
    $().getclass('member').hover(function(){
        $().getclass('member_ul').show()
    },function(){
        $().getclass('member_ul').hide()
    })
    //登录框居中
    $().getid('login').center(300,300);
    $().resize(function(){
        $().getid('login').center(300,300)
    })
    $().getclass('button').click(function(){
        $().getid('login').show()
    })
    $().getclass('close').click(function(){
        $().getid('login').hide()
    })
    //var width=document.documentElement.clientWidth+'px';
    //var height=document.documentElement.clientHeight+'px';
    //$().getid('screen').css('width',width).css('height',height).css('display','none')

    //遮屏
    $().getclass('button').click(function(){
        $().getid('login').show()
        $().getid('screen').lock()
    })
    $().getclass('close').click(function(){
        $().getid('login').hide()
        $().getid('screen').unlock()
    })
    $().getid('login').drag()
}
