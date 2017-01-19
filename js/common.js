
$(function () {

    downloadBar();
    setFootStyle();

    var href = window.location.href,
        reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    // 匹配ip地址  http://91.16.0.1/hisihi-cms/api.php?s=/public/topContentV2_9/id/1263  参考嘿设汇
    this.isFromApp = href.indexOf('banke-app') >= 0;  //是否来源于app

    //添加下载条
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


});