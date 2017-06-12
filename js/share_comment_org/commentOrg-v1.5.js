/**
 * Created by hisihi on 2017/4/13.
 */
$(function() {

    //浏览量
    viewCounts();

    //页面禁止滚动
    window.scrollControl(false);

    var href = window.location.href;
    var notFromApp = href.indexOf('share') >= 0;  //是否来源于app

    //点击弹出拨打电话框，判断来源是否是分享页
    $(document).on( window.eventName,'.address-call', function() {
        if (!notFromApp) {
           //调用客户端拨打电话方法
           showCallNumber();
        }else {
            $('.call-mask').removeClass('hide').addClass('show');
            window.scrollControl(false);
        }
    });

    $(document).on(window.eventName,function(e){
        toHideMask(e);
    });

    //点击关闭拨打电话弹窗
    $(document).on( window.eventName,'.quite', function() {
        var $target=$('.call-mask');
        $target.removeClass('show').addClass('hide');
    });

    function toHideMask(e){
        var $target=$(e.srcElement);
        if($target.hasClass('box') ||
            $target.hasClass('call-box') ||
            $target.closest('.call-box').length>0)
        {
            return;
        }
    };

    //点击加载更多
    $(document).on(window.eventName,'.more-btn',function() {
        //页面恢复滚动
        window.scrollControl(true);
        showOrgInfo();
    });

    //展示机构信息
    function showOrgInfo () {
        var box=$('.org-information'),
            add=$('.address'),
            btn=$('.more-btn');
        box.removeClass('hide');
        add.removeClass('none');
        btn.addClass('none');
    }

    /*
     * 填写手机号
     * 输入框变色，按钮变色*/
    $(document).on('input', '.res-box-input', function(){
        var number=$(this).val(),
            reg = /^1(3|4|5|7|8)\d{9}$/;
        var $btn=$('.res-btn');
        if(number!=''){
            if(reg.test(number)) {
                $('.res-box-input').addClass('active');
                $btn.removeClass('nouse');
                $btn.addClass('active');
            }else{
                $('.res-box-input').removeClass('active');
                $btn.addClass('nouse');
                $btn.removeClass('active');
            }
        }
    });

    //预约
    $(document).on(window.eventName,'.res-btn.active', function () {
        window.controlLoadingBox(true);
        var url='/v1.3/share/doenrol',
            input=$('.res-box-input').val(),
            uid=$('.head').attr('data-uid'),
            data={
                mobile:input,
                invitation_uid:uid,
            };
        $(this).removeClass('active');
        getDataAsync(url,data,function(res) {
            //成功返回之后调用的函数
            window.controlLoadingBox(false);
            if (res.status_code == 0) {
                window.showTips('<p>恭喜您，预约成功!</p>',2000);
                window.setTimeout(function() {
                    //调用客户端返回方法
                    backToMypage();
                },2000);
            }
            else{
                window.showTips(res.message,2000);
            }
        }, function(){
            window.controlLoadingBox(false);
            $(this).addClass('active');
        }, 'post');
    });

    //调用客户端方法,显示拨打电话
    function showCallNumber(){
       if (window.deviceType.mobile) {
           if (this.deviceType.android) {
               //如果方法存在
               if (typeof AppFunction != "undefined"&&  typeof AppFunction.callServicePhone !='undefined') {
                   AppFunction.callServicePhone(); //调用app的方法，得到用户的基体信息
               }
           }
           else {
               //如果方法存在
               if (typeof callServicePhone != "undefined") {
                   callServicePhone();//调用app的方法，得到电话
               }
           }
       }
    };

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

    /*
    * 调用浏览量接口
     typeId  表示页面类型
     1 课程页面
     2 表示机构页面
     3 表示团购页面
     id   表示记录id
     id   表示记录id
     * */
    function viewCounts() {
        var url='/v1.5/share/updateviewcounts',
            box=$('.head'),
            typeId =box.attr('data-typeId'),
            id =box.attr('data-id'),
            data = {
                typeid:typeId,
                id:id
            }
            getDataAsync(url,data,function(){
                window.showTips('<p>恭喜您，预约成功!</p>',2000);
            },null,'post');


    };



});