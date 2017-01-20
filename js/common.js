
$(document).ready(function () {


    var href = window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    // 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263  参考嘿设汇
    this.isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app

    //添加下载条
    window.downloadBar = function() {
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
    window.setFootStyle = function() {
        //if(this.isFromApp) {
        //    return ;
        //}
        var $target = $('#downloadCon'),
            h = $target.height();
        $target.css({ 'opacity': 1});
        $('body').css({'margin-bottom': h +'px'});
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
    };

});


