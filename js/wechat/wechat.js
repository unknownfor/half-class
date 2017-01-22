/**
 * Created by hisihi on 2017/1/16.
 */
$(function () {

    downloadBar();
    setFootStyle();

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
    var countdown = 25;
    $(document).on('click','#phone-code-btn', function setTime() {
            if (countdown == 0) {
                this.removeAttribute("disabled");
                this.value = "获取验证码";
                countdown = 25;
                return;
            } else {
                this.setAttribute("disabled", true);
                //this.attr("disabled,true");
                this.value = " " + countdown + " s";
                countdown--;
            }
        var that=this;
        setTimeout(function () {
                    setTime.call(that);
                    //setTime(that)
                }, 1000)
        });

    //验证码验证
    //合法性

    //注册
    $(document).on('click','.btn.active', function () {
            $('#wrapper').hide();
            addLoadingImg();
            controlLoadingBox(true);
            var phone = $('#phone-num').val,
                code = $('#user-code').val;
            $.ajax({
                type:"POST", //提交数据的类型 POST GET
                url:"http://XX",  //用户注册
                data:{
                    //手机号 短信验证码
                    username:phone,
                    smsId:code
                },
                success:function(){
                    //成功返回之后调用的函数
                    controlLoadingBox(false),
                    showSuccessPage();
                },
                //调用出错执行的函数
                error: function(){
                    //请求出错处理
                    controlLoadingBox(false),
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