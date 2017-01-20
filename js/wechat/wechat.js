/**
 * Created by hisihi on 2017/1/16.
 */
$(function () {

    var href= window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    //参考嘿设汇 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263
    this.isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app

    //加载下载条
    //downloadBar();
    //setFootStyle();

    //加载等待动画
    addLoadingImg();
    addTip();


    //填充信息，按钮变色
    $(document).on('input','#user-code, #phone-num', function(){
        showClickBtn()
        //checkPhoneNum();
    });

    //显示预约报名框
    $(document).on('click','.sing-in-box .active', function () {
        controlLoadingBox(true);
    });



    /**添加下载条
     * 判断是否来自于App
     *添加下载条
     * **/
    function downloadBar() {
        if (downloadBar.show && !this.isFromApp) {
            return;
        }
        var str = '<div id="downloadCon">' +
            '<a id="downloadBar" href="http://www.hisihi.com/download.php">' +
            '<img id="downloadBar-img" src="http://pic.hisihi.com/2017-01-18/1484705240013582.png" />' +
            '</a>' +
            '</div>';
        $('body').append(str);
    }

    //设置底部下载条高度样式
    function setFootStyle () {
        if(this.isFromApp) {
            return ;
        }
        var $target = $('#downloadCon'),
            h = $target.height();
        $target.css({ 'opacity': 1});
        $('body').css({'margin-bottom': h +'px'});
        return h;
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
        var $input =$('#phone-num'),
            number = $input.eq(0).val().trim(),
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




    /*添加加载动画*/
   function addLoadingImg(){
        if($('#loading-data').length>0){
            return;
        }
        var str = '<div id="loading-data">'+
            '<img class="loding-img"  src="http://pic.hisihi.com/2016-05-11/1462946331132960.png">'+
            '</div>';
        $('body').append(str);
    };

    /*
     *控制加载等待框
     *@para
     * flag - {bool} 默认隐藏
     */
    function controlLoadingBox(flag){
        var $target=$('#loading-data');
        if(flag) {
            $target.addClass('active').show();
        }else{
            $target.removeClass('active').hide();
        }
    };

    /*添加操作结果提示框*/
    function addTip(){
        if($('#result-tips').length>0){
            return;
        }
        var str = '<div id="result-tips" class="result-tips" style="display: none;"><p></p></div>';
        $('body').append(str);
    };

    /*
     * 显示操作结果，防止出现在重复快速点击时，计时器混乱添加了  timeOutFlag  进行处理
     * @para:
     * tip - {string} 内容结果
     * timeOut - {number} 显示时间
     */
    function showTips(tip,timeOut){
        if(this.timeOutFlag){
            return;
        }
        timeOut= timeOut || 1500;
        if(tip.indexOf('<')<0){
            tip='<p>'+tip+'</p>';
        }
        this.timeOutFlag=true;
        var $tip=$('body').find('.result-tips'),
            that=this;
        $tip.html(tip).show();
        window.setTimeout(function(){
            $tip.hide().html('');
            that.timeOutFlag=false;
        },timeOut);
    };

    /*
     * 显示操作结果，防止出现在重复快速点击时，计时器混乱添加了  timeOutFlag  进行处理
     * 不会自动隐藏
     * @para:
     * tip - {string} 内容结果
     * strFormat - {bool} 自定义的简单格式
     */
    function showTipsNoHide(tip,strFormat){
        if(this.timeOutFlag){
            return;
        }
        this.timeOutFlag=true;
        var $tip=$('body').find('.result-tips'),
            $p=$tip.find('p').text(tip),that=this;
        if(strFormat){
            $tip.html(strFormat);
        }
        $tip.show();

    };

    /*隐藏信息提示*/
    function hideTips() {
        var $tip = $('body').find('.result-tips'),
            $p = $tip.find('p'),
            that = this;
        $tip.hide();
        $p.text('');
        this.timeOutFlag = false;
    };



});