
$(function () {
    FastClick.attach(document.body);
    var href = window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    // 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263  参考嘿设汇
    var isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app
    window.isLocal=false; //是否是本地调试来源于app  ，由于fastClick浏览器调试时，事件不方便，添加只是方便浏览器调式，以及本地取测试数据
    if(reg.test(href) || href.indexOf('http://admin.laadmin.dev/') >= 0){
        window.isLocal=true;
    }
    window.eventName = 'click';
    if (this.isLocal) {
        window.eventName = 'touchend';
    }
    //downloadBar();
    setFootStyle();

    window.deviceType = operationType();

    //添加下载条
    function downloadBar() {
        if (isFromApp) {
            return;
        }
        var str = '<div id="downloadCon">' +
            '<a id="downloadBar" href="http://www.91banke.com/web/download">' +
            '<img id="downloadBar-img" src="http://pic.hisihi.com/2017-01-18/1484705240013582.png" />' +
            '</a>' +
            '</div>';
        $('body').append(str);
    }

    //设置底部下载条高度样式
    function setFootStyle () {
        if(isFromApp) {
            return ;
        }
        var $target = $('#downloadCon'),
            h = $target.height();
        $target.css({ 'opacity': 1});
        $('body').css('padding-bottom',h +'px');
        return h;
    }

    /*添加加载动画*/
    window.addLoadingImg = function(){
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
    window.controlLoadingBox = function(flag){
        var $target=$('#loading-data');
        if(flag) {
            $target.addClass('active').show();
        }else{
            $target.removeClass('active').hide();
        }
    };

    /*添加操作结果提示框*/
    window.addTip = function(){
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
    window.showTips = function(tip,timeOut){
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
    window.showTipsNoHide = function (tip,strFormat){
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
    window.hideTips = function () {
        var $tip = $('body').find('.result-tips'),
            $p = $tip.find('p'),
            that = this;
        $tip.hide();
        $p.text('');
        this.timeOutFlag = false;
    },


    /*
     * 禁止(恢复)滚动
     * para：
     * flag - {bool} 允许（true）或者禁止（false）滚动
     * $target - {jquery obj} 滚动对象
     */
    window.scrollControl = function(flag,$target){
        if(!flag) {
            $target = $target || $('body');
            this.scrollTop = $target.scrollTop();
            $('html,body').addClass('noscroll');
        }else{
            $('html,body').removeClass('noscroll');
            window.scrollTo(0, this.scrollTop);
        }
    };


    /*
     *判断webview的来源
     */
    function operationType() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    };

});