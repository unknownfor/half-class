/**
 * Created by hisihi on 2017/1/16.
 */
$(function () {

    downloadBar();

    var href= window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
        // 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263  参考嘿设汇
    this.isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app

    //填充信息，按钮变色
    $(document).on('input','#user-code, #phone-num', function(){
        showClickBtn(),
        checkPhoneNum();
    });

    //显示预约报名框
    $(document).on('click','.sing-in-box .active', 'singIn');



    /**添加下载条
     * 判断是否来自于App**/
    function downloadBar () {
        if(downloadBar.show && !this.isFromApp) {
            return ;
        }
        var str = '<div id="downloadCon">' +
                    '<a id="downloadBar">' +
                    '<img src="http://pic.hisihi.com/2017-01-18/1484705240013582.png" />'+
                    '</a>'+
                    '</div>';
        $('body').append(str);
    }

    /**判断验证码栏是否为空
     * 验证手机号码的合法性
     * 按钮变色，展示报名成功页面**/
    function showClickBtn(){
        var $target=$('.register-box input'),
            txt1=$target.eq(0).val().trim(),
            $btn=$('.btn'),
            nc='active';
        if(txt1){
            $btn.addClass(nc);
        }else{
            $btn.removeClass(nc);
        }
    };

    function checkPhoneNum() {
        var $input =$('.register-box input'),
            //that=this,
            number = $input.eq(0).val().trim(),
            name = $input.eq(1).val().trim(),
            reg=/^1\d{10}$/;
        if (!reg.test(number)) {
            if($('#result-tips').length>0){
                return;
            }
            var str = '<div id="result-tips" class="result-tips" style="display: none;"><p>请正确输入手机号码</p></div>';
            $('body').append(str);
            return;
        }
    };

    //判断是否注册，如果手机号码已经注册过则提示“您已经报名过该课程”


});