/**
 * Created by hisihi on 2017/1/16.
 */
$(function () {

    downloadBar();
    setFootStyle();
    //showSuccessPage();
    //addTip();
    //showTips('注册代码');

    var that = this,
        href= window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    //参考嘿设汇 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263
    this.isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app


    //填充信息，按钮变色
    $(document).on('input', '#phone-num', function(){
        var number=$(this).val(),
        reg = /^1(3|4|5|7|8)\d{9}$/;
        var $code=$('#phone-code-btn'),
            $btn=$('.btn'),
            code=$('#user-code').val();
        if(reg.test(number)) {
           $code.removeClass('disabled');
           if(code!=''){
               $btn.addClass('active');
           }else{
               $btn.removeClass('active');
           }
        }else{
            $code.addClass('disabled');
            $btn.removeClass('active');
        }
    });

    //填充信息，按钮变色
    $(document).on('input', '#user-code', function() {
        var number=$('#phone-num').val(),
            reg = /^1(3|4|5|7|8)\d{9}$/;
        var $btn=$('.btn'),
            code=$(this).val();
        if(reg.test(number)) {
            if(code!=''){
                $btn.addClass('active');
            }else{
                $btn.removeClass('active');
            }
        }else{
            $btn.removeClass('active');
        }
    });

    //倒计时
    var countdown=60;
    function setTime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value="获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value=" "+ countdown +" s";
            countdown--;
        }
        setTimeout(function() {
                setTime(obj) }
            ,1000)
    }

    //注册
    $(document).on('click','.btn.active', function () {
            //$('body').addClass('none');
            $('body').hide();
            addLoadingImg();
            controlLoadingBox(true);
            $.ajax({
                type:"POST", //提交数据的类型 POST GET
                url:"XX",  //提交的地址
                data:{Name:"",Password:""},  //提交的数据
                success:function(){
                    //成功返回之后调用的函数
                    controlLoadingBox(false),
                    showSuccessPage();
                },
                //调用出错执行的函数
                error: function(){
                    //请求出错处理
                    addTip(),
                    showTips('注册不成功');
                }
            });
    });


    /**
     * 显示报名成功页面
     */
    function showSuccessPage() {
        //隐藏注册框
        $('.register').hide();
        $('.coupon').removeClass('hide');
        $('.reward').removeClass('hide');
    };



});