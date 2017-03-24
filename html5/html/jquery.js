/**
 * Created by Administrator on 2017/3/12 0012.
 */
window.onload=function(){
    //    $('#reg').dialog({
    //        title:'知问注册',
    //        buttons:{
    //            '提交':function(){
    //                alert('提交')
    //            },
    //            '取消':function(){
    //                $('#reg').dialog('close')
    //            }
    //        },
    //        //position:'left top',
    //        width:500,
    //        height:300,
    //        minWidth:300,
    //        minHeight:200,
    //        //dialog行为选项
    //        autoOpen:false,//默认为true,调用dialog()方法时就会打开对话框；如果为false,对话框不可见，但对话框已创建，
    //                        //可以通过dialog('open')可见
    //        //modal:true,     //对话框外设置一层纱罩，使得对话框外不可操作
    //        closeText:'关闭',
    //        draggable:false,//默认为true,可移动对话框，如果为false，则对话框不可以移动
    //        resizable:false,//默认为true,可移动对话框，如果为false，则对话框不可以移动
    //        //focus:function(e,ui){
    //        //    alert('注册')
    //        //}
    //    })
    //$('#reg_a').click(function(){
    //    $('#reg').dialog('open')
    //})
    //
    //$('#login_a').click(function(){
    //    $('#login').dialog('open')
    //})
    //$('#login').dialog({
    //    title:'会员登录',
    //    autoOpen:false,
    //    //focus:function(e,ui){
    //    //    alert('登录')
    //    //}
    //})
    //$('#search_button').button({
    //    disabled:false,
    //    label:'搜索',
    //    //icons:{
    //    //   primary:'ui-icon-search',
    //    //}
    //})
    //$('#search_button').button('disable')
    //$('#search_button').button('enable')
    ////alert($('#search_button').button('option','label'))
    //$('#search_button').button('option','label','查找')
    //$('.ui-button').eq(2).button('disable')
    //
    //$('input[type=radio]').button()

    $('#reg').dialog({
        title:'知问注册',
        autoOpen:true,
        width:320,
        height:360,
        modal:true,
        resizable:false,
        buttons:{
            '提交':function(){
               $(this).submit();
            }
        }
    }).buttonset().validate({
        errorLabelContainer:'ol.reg_error',        //把错误信息放在ol 里面
        wrapper:'li',
        showErrors:function(errorMap,errorList){
            var errors=this.numberOfInvalids();       //动态显示高度
            if(errors>0){
                $('#reg').dialog('option','height',20*errors+360)
            }
            this.defaultShowErrors()
        },
        highlight:function(element,errorClass){
            $(element).css('border','1px solid red')
        },
        unhighlight:function(element,errorClass){
            $(element).css('border','1px solid #ccc')
            $(element).parent().find('span').html('ok')
        },
        rules:{
            user:{
                required:true,
                minlength:2
            },
            password:{
                required:true,
                minlength:6
            },
            email:{
                required:true,
                minlength:true
            },
            date:{
                date:true
            }
        },
        messages:{
            user:{
                required:'帐号不得为空',
                minlength:'帐号不得小于{0}位'
            },
            password:{
                required:'密码不得为空',
                minlength:'密码不得小于{0}位'
            },
            email:{
                required:'邮箱不得为空',
                minlength:'请输入正确的邮箱'
            }
        }
    });

    $('#date').datepicker()
//tooltip(),提示工具方法
    $('#reg p input[title]').tooltip({
        position:{
            my:'left top'
        },
        //disabled:true,            //禁用title
        //content:'改变title',    //改变title文本
        //items:'text',       //过滤器
    })

    //自动补全
    $('#e-mail').autocomplete({
        dely: 0,
        source:function(request,response){
            //获取用户输入的内容
            //request.term
            //绑定数据源
           var hosts=['qq.com','163.com','263.com','gmail.com','sina.com.cn'];
            //response(hosts)
            term=request.term;    //获取用户输入的内容
            name=term;              //邮箱的用户名
            host='';               //邮箱的域名
            ix=term.indexOf('@');   //@的位置
            result=[] ;              //最终呈现的邮箱列表
           //当有@的时候，重新分配用户名和域名
            if(ix>-1){
               name=term.slice(0,ix),
               host=term.slice(ix+1)
           }
            if(name){
               //如果用户已经输入@和后面的域名，
                //那么就找到相关的域名提示，比如bssk@1,就提示bssk@163.com
                //如果用户还没有输入@或后面的域名，
                //那么久把所有的域名都显示出来
                var finedHosts=[];
                if(host){
                    //$.grep()筛选数据
                    finedHosts=$.grep(hosts,function(value,index){   //value是值，index是位置
                        return value.indexOf(host)>-1
                    });
                }else{
                    finedHosts=hosts;
                }
                //$.map()修改数据
               var findedResult= $.map(finedHosts,function(value,index){
                   return name+'@'+value;
               });
                result=findedResult;
            }
            response(result)
        }
        //source: function (request, response) {
        //    var hosts = ['qq.com', '163.com', '263.com', 'gmail.com', 'sina.com'];
        //    name = request.term;
        //    host = '';
        //    ix = name.indexOf('@');
        //    result=[];
        //    if (ix > -1) {
        //        name = name.slice(0, ix)
        //        host = name.slice(ix+1)
        //    }
        //   if(name){
        //
        //   }
        //}

        })
    // $('#reg').ajaxForm(         //ajaxForm()方法针对form的
    //            function(){
    //                alert('提交成功')
    //    }
    //)
    $('#reg').submit(function(){
        $(this).ajaxSubmit({
            //clearForm:true,         //清空表单
            resetForm:true,         //重置表单
            data:{
                aaa:'bbb',
                ccc:'ddd'
            },
            success:function(responseText,statusText){            //成功之后执行
                alert(responseText+statusText)
            },
            error:function(a,b){
                alert('错误')                 //错误之后执行
            }
            //target:'#box'
        })
        return false;
    })
    //alert($('#reg').formSerialize())         //表单序列化
    $('#reg #user').clearFields()           //清除某个字段
};
