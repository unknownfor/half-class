/**
 * Created by jimmy-hisihi on 2017/5/6.
 */
$(function (){
    window.addLoadingImg();
    window.addTip();

    //浏览量
    var oldUser=$('.user').attr('data-record-id');
    if( oldUser != 0){
        viewCounts();
    }

    /*
    * 弹出注册窗口*/
    $(document).on(window.eventName,'.join-btn',function(){
        $('.box1').removeClass('hide');
        $('.box').addClass('hide');
    });


    /*
     * 点击头像，弹出注册窗口*/
    $(document).on(window.eventName,function(){
        $('.box1').removeClass('hide');
        $('.box').addClass('hide');
    });



    /*
    * 填写手机号
    * 输入框变色，按钮变色*/
    $(document).on('input', '#phone-num', function(){
        //页面禁止滚动
        window.scrollControl(false);
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
            window.scrollControl(true);
        }
    });


    $(document).on(window.eventName,'#register-btn.active', function () {
        window.controlLoadingBox(true);
        var url='/v1.3/share/doenrol',
            uid=$('.user').attr('data-uid'),
            cid=$('.user').attr('data-course-id'),
            oid=$('.user').attr('data-org-id'),
            mobile = $('#phone-num').val(),
            groupBuyingId=$('.user').attr('data-record-id'),

            data={
                org_id:oid,
                course_id:cid,
                invitation_uid:uid,
                mobile:mobile,
                group_buying_id:groupBuyingId,
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


    /**
     * 显示报名成功页面
     */
    function showSuccessPage() {
        $('.box1').addClass('hide');
        $('.container').removeClass('hide');
    }


    /*
     * 调用浏览量接口
     typeId  表示页面类型
     1 课程页面
     2 表示机构页面
     3 表示团购页面
     id   表示记录id
     * */
    function viewCounts() {
        var  box=$('.user'),
            typeId =box.attr('data-type-id'),
            id =box.attr('data-record-id'),
            url='/v1.5/share/updateviewcounts',
            data = {
                typeid:typeId,
                id:id
            }
        getDataAsync(url,data,function(){
            
        },null,'post');
    };


});
