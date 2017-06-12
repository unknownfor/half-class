/**
 * Created by jimmy-hisihi on 2017/5/6.
 */
$(function (){
    window.addLoadingImg();
    window.addTip();

    /*
    * 弹出注册窗口*/
    $(document).on(window.eventName,'#register-area',function(){
        $('.box1').removeClass('hide');
        $('.box').addClass('hide');
    });

    /*
    * 填写手机号
    * 输入框变色，按钮变色*/
    $(document).on('input', '#phone-num', function(){
        var number=$(this).val(),
            reg = /^1(3|4|5|7|8)\d{9}$/;
        var $btn=$('.btn');
        if(number!=''){
            if(reg.test(number)) {
                $('.phone').addClass('active');
                $btn.removeClass('nouse');
                $btn.addClass('active');
            }else{
                $('.phone').removeClass('active');
                $btn.addClass('nouse');
                $btn.removeClass('active');
            }
        }
    });

    $(document).on(window.eventName,'#register-btn.active', function () {
        window.controlLoadingBox(true);
        var url='/v1.3/share/doenrol',
            uid=$('.user').attr('data-uid'),
            cid=$('.user').attr('data-course-id'),
            oid=$('.user').attr('data-org-id'),
            mobile = $('#phone-num').val(),
            oname=$('.user').attr('data-org-name'),
            cname=$('.user').attr('data-course-name'),
            data={
            org_id:oid,
            course_id:cid,
            invitation_uid:uid,
            mobile:mobile,
            org_name:oname,
            course_name:cname
        };
        $(this).removeClass('active');
        getDataAsync(url,data,function(res) {
            //成功返回之后调用的函数
            window.controlLoadingBox(false);
            if (res.status_code == 0) {
                window.showTips('<p>恭喜您，预约成功!</p>',2000);
                window.setTimeout(function() {
                    showSuccessPage();
                },2000);
            }
            else{
                window.showTips(res.message);
            }
        },function(){
            window.controlLoadingBox(false);
            $(this).addClass('active');
        },'post');
    });

    //请求数据
    function getDataAsync(url,data,callback,eCallback,type){
        type = type ||'get';
        data._token=$('input[name="_token"]').val();
        $.ajax({
            type: type,
            url: url,
            data: data,
            success: function (res) {
                callback(res);
            },
            error: function () {
                //请求出错处理
                window.controlLoadingBox(false),
                    window.showTips('操作失败');
                eCallback && eCallback();
            }
        });
    }


    /**
     * 显示报名成功页面
     */
    function showSuccessPage() {
        $('.box1').addClass('hide');
        $('.container').removeClass('hide');
    }


});
