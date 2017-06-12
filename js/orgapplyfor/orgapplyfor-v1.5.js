/**
 * Created by hisihi on 2017/05/22.
 */
$(function () {
    window.addLoadingImg();
    window.addTip();


    //弹出申请页
    $(document).on(window.eventName,'.join-btn',function(){
        $('.cooperation').removeClass('hide');
        $('body').addClass('bg-color');
        $('.join').addClass('hide');
    });

    //跳转“我的”tab页
    $(document).on(window.eventName,'.welcome-btn',function(){
        backToMypage();
    });



    $(document).on('input', '#telphone', function(){
        var number=$(this).val(),
            reg = /^1(3|4|5|7|8)\d{9}$/,
            $btn=$('.submit-box');
        //调用此方法, 可以在别的方法中调用它
            if(number != '' && reg.test(number)) {
                    if (checkInput() == 1) {
                    $btn.removeClass('disabled');
                    $btn.addClass('active');
                    }
                    else {
                        window.setTimeout(function() {
                            window.showTips('<p>信息不能为空!</p>',2000);
                        },200);
                        $btn.removeClass('active');
                        $btn.addClass('disabled');
                    }
                }else{
                    $btn.removeClass('active');
                    $btn.addClass('disabled');
                }
    });


    /*
    * 检查input输入框是否有内容
    * flag = 1 合格,有输入值
    * flag = 0 不合格
    * */
    function checkInput() {
        var flag,
            name=$('#name').val().length,
            address=$('#address').val().length,
            contact=$('#contact').val().length;
        if (name > 0 && address > 0) {
            if (contact > 0) {
                 flag = 1;
            }else {
                flag = 0;
            }
        }else {
            flag = 0;
        }
        return flag;
    }

    //注册
    $(document).on(window.eventName,'.submit-box.active', function () {
        window.controlLoadingBox(true);
        var name = $('#name').val(),
            address = $('#address').val(),
            contact = $('#contact').val(),
            telphone = $('#telphone').val();
        var url='/bankehome/addorgapplyfor',
            data={
                name:name,
                address:address,
                contact:contact,
                tel_phone:telphone
            };
        $(this).removeClass('active');
        getDataAsync(url,data,function(res) {
            //成功返回之后调用的函数
            window.controlLoadingBox(false);
            if (res.status == true) {
                $('body').removeClass('bg-color');
                window.showTips('<p>恭喜您，申请已提交!</p>',2000);
                    //弹出成功提示页
                    $('.welcome').removeClass('hide');
                    $('.cooperation').addClass('hide');
            }
            else{
                window.showTips(res.msg);
            }
            },function(){
                window.controlLoadingBox(false);
                $(this).addClass('active');
            },'post');
    });


    //调用客户端方法，跳转回APP“我的”
    function backToMypage(){
        if (window.deviceType.mobile) {
            if (this.deviceType.android) {
                //如果方法存在
                if (typeof AppFunction != "undefined"&&  typeof AppFunction.backToPrePage !='undefined') {
                    AppFunction.backToPrePage(); //调用app的方法，得到用户的基体信息
                }
            }
            else {
                //如果方法存在
                if (typeof backToPrePage != "undefined") {
                    backToPrePage();//调用app的方法，得到电话
                }
            }
        }
    };

});