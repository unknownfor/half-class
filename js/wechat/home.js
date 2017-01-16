/**
 * Created by hisihi on 2017/1/16.
 */
define(['base','async','myPhotoSwipe'],function(Base,Async,MyPhotoSwipe) {

    var Invitation = function (id, url) {
        var that = this;
        this.id = id;
        this.baseUrl = url;
        var eventsName = 'click', that = this;
        if (this.isLocal) {
            eventsName = 'touchend';
            this.baseUrl = this.baseUrl.replace('api.php', 'hisihi-cms/api.php');
        }

        //点击报名事件，弹出扫码报名窗口
        $(document).on(eventsName,'#getSignIn',function () {
            $('.mask').addClass('show');
            that.scrollControl(false);
        });

        //点击扫码报名，隐藏报名弹窗
        $(document).on(eventsName,'.mask', $.proxy(this,'hideSignIn'));

        this.controlLoadingBox(true);//是否显示加载等待动画
        window.setTimeout(function () {
            that.loadData();
        }, 100);

        //photoswipe   查看相册
        new MyPhotoSwipe('.album-ul',{
            bgFilter:true,
        });

    };

    //下载条
    var config={
        downloadBar:{
            show:true,
            pos:0
        }
    };

    Invitation.prototype=new Base(config);
    Invitation.constructor=Invitation;
    var t =Invitation.prototype;


    //获得数据
    t.loadData = function(){
        var that = this,
        //http://localhost/hisihi-cms/api.php?s=/FamousTeacher/detail/
            queryPara = {
                url: this.baseUrl + 'FamousTeacher/detail/',
                paraData: {id: this.id},
                sCallback:function(result){
                    //如果数据不存在
                    if(!result.data||result.data.teacher == false){
                        that.controlLoadingBox(false);
                        that.showTips('老师详情加载失败');
                    }else{
                        that.controlLoadingBox(false);
                        that.loadAllInfo(result);
                    }
                },
                eCallback:function(){
                    that.controlLoadingBox(false);
                    that.showTips('老师详情加载失败');
                },
                type: 'get',
                async: this.async
            };
        this.getDataAsync(queryPara);
    };

    //加载页面方法
    t.loadAllInfo = function (result){
        this.loadHeadInfo(result),
            this.loadTeacherInfo(result),
            this.loadClassDetail(result),
            this.loadProjectDetail(result),
            this.loadGetSignIn(result),
            this.loadMask(result);
    };

    //加载课程信息
    t.loadHeadInfo = function(result) {
        //判断数据是否存在
        if (!result||result.data.name == null) {
            return '';
        }
        var str='',
            titStr='',
            timeStr='',
            name=result.data.name,
            author=result.data.collator,
            title=result.data.teacher.title,
            detail=result.data.introduce,
            teacher= result.data.teacher.name;
        titStr= '<span class="teacherInfo">('+ title +')</span>';
        if (!title) {
            titStr='';
        }
        var    teaStr = '<div class="headTeacherDetail" id="teacherName">'+
                '<span class="teacherTips">主讲人：</span>'+
                '<span class="teacherTitle">'+ teacher +'</span>'+
                titStr +
                '</div>',

            detStr ='<div class="headTeacherDetail" id="teacherClass">'+
                '<div class="teacherTips">课程介绍：</div>'+
                '<div class="teacherDetail">'+ detail + '</div>'+
                '</div>',

            timeStr = this.getTimeInfo(result);

        if (teacher==null) {
            teaStr ='';
        }
        if(detail==null) {
            detStr= '';
        }
        str ='<div class="headTitle">' +
            '<div class="headMainTitle">'+ name +'</div>'+
            '<div class="headDetail">'+
            '<span id="author">'+ '整理：' + author +'</span>'+
            '<span id="time">'+ this.getTimeFromTimestamp(result.data.create_time,'MM-dd hh:mm') +'</span>'+
            '</div>'+
            '</div>'+
            '<div class="headTeacher">' +   teaStr  + detStr + timeStr + '</div>';
        //数据不存在隐藏
        $('.head').removeClass('hide');
        $('.head').html(str);
    };

    //获取比赛时间，课程时间和状态判断
    t.getTimeInfo = function (result) {
        var  str = '',
            statusStr='',
            begin = this.getTimeFromTimestamp(result.data.start_time,'yyyy年MM月dd日 hh:mm');
        statusStr=  '<span class="teacherStatus">(' +this.getDaysBetween(result)+')</span>';
        //如果没有填写开课时间，则显示待定状态
        if (result.data.start_time == 0){
            begin = '待定',
                statusStr ='';
        }
        str =  '<div class="headTeacherDetail" id="teacherTime">'+
            '<div class="teacherTips">开课时间：</div>'+
            '<div class="teacherDetail">'+
            begin + statusStr+
            '</div>'+
            '</div>';
        return str;
    };

    /*
     * 日期时间检查
     * 获取当前时间进行时间差计算
     * 格式为YYYY-MM-DD
     * */
    t.getDaysBetween = function (result) {
        var now = new Date(),
            t2 = result.data.start_time,
            recordTime=new Date(parseFloat(t2)*1000),
            diff = now -recordTime;
        if (diff > 0) {
            return '已结束';
        }
        return '报名进行中';
    };


    //加载老师介绍
    t.loadTeacherInfo = function(result) {
        if (!result||result.data.teacher.name == null) {
            return '';
        }
        var str='',
            titStr='',
            name=result.data.teacher.name,
            title=result.data.teacher.title,
            detail=result.data.teacher.introduce;
        titStr= '<span id="title">'+ title +'</span>';
        if (title==null){
            titStr='';
        }
        str=  '<div class="contentHead">'+
            '<span id="name">'+ name +'</span>'+
            titStr+
            '</div>'+
            '<div class="contentInfo">'+ detail +'</div>';
        //数据不存在隐藏
        $('#teacher').removeClass('hide');
        $('#teacher').html(str);
    };

    //加载课程笔记(课程已结束)
    t.loadClassDetail = function(result) {
        //判断数据是否存在
        if (!result||!result.data||!result.data.note) {
            return '';
        }
        //如果还是立即报名状态，不显示课堂笔记
        var now = new Date(),
            t2 = result.data.start_time,
            recordTime=new Date(parseFloat(t2)*1000),
            diff = now -recordTime;
        if (diff < 0) {
            return '';
        }
        else {
            var str = '',
                detail = result.data.note;
            str = '<div class="contentHead">' +
                '<span class="contentTitle">课堂笔记</span>' +
                '</div>' +
                '<div class="contentInfo">' +
                detail +
                '</div>';
        }
        //数据不存在隐藏
        $('#note').removeClass('hide');
        $('#note').html(str);
    };

    //加载部分作品(课程报名状态/或者课程笔记数据为空)
    t.loadProjectDetail =  function(result) {
        //判断数据是否存在
        if (!result||result.data.teacher_works == null) {
            return '';
        }
        var strLi='',
            len=result.data.teacher_works.length,
            item;
        for(var i=0;i<len;i++){
            item=result.data.teacher_works[i];
            var imgH = item.size.height,
                imgW = item.size.width;
            strLi += '<li>' +
                '<a href="' + item.url + '" data-size="' + imgW + 'x' + imgH + '"></a>' +
                '<img src="' + item.url + '">' +
                '</li>';
        }
        var   str ='<div class="contentHead">'+
            '<span class="contentTitle">部分作品欣赏</span>'+
            '</div>'+
            '<ul class="contentInfo album-ul">'+
            strLi+
            '</div>';
        //数据不存在隐藏
        $('#project').removeClass('hide');
        $('#project').html(str);
    };

    //加载报名按钮
    t.loadGetSignIn = function(result) {
        var str = '<div id="getSignIn"><span>立即报名</span></div>',
            now = new Date(),
            t2 = result.data.start_time,
            recordTime=new Date(parseFloat(t2)*1000),
            diff = now -recordTime;
        //判断课程状态，是否是预告状态,如果是则显示报名按钮
        if (diff > 0) {
            //课程已结束
            str = '';
        }else {
            $('body').append(str);
        }
    };

    //加载弹窗
    t.loadMask = function(result) {
        //判断弹窗是否有填写数据，否则返回空
        if (!result||result.data.registration_way == null) {
            return '';
        }
        var str = '',
            detail= this.maskDetailStyle(result);
        str = '<div class="mask">'+
            '<div class="infoBox">'+
            '<div class="infoBoxTitle" id="titleFirst">报名方式</div>'+
            '<div class="infoBoxDetail">'+
            detail+
            '</div>'+
            '</div>'+
            '</div>';
        $('body').append(str);
    };

    //弹窗数据分离，设置样式
    t.maskDetailStyle = function (result) {
        var strP = '',
            item,
            str = '',
            detail= result.data.registration_way,
        //循环数组
            txt=detail.replace(/'/g,'"'),
            info=JSON.parse(txt),
            len = info.txtArr.length;
        for (var i= 0;i<len;i++){
            item = info.txtArr[i];
            strP += '<P>'+ item +'</P>';
        }
        str = strP+'<img src= "' + info.img +'">';
        return str;
    }

    //点击弹出层遮罩，收起弹窗
    t.hideSignIn = function (e){
        //默认写法
        var event = window.event || e,
            target=event.srcElement || event.target,
            $target=$(target);
        //找到最近的div，长度为1判断是否存在
        if($target.closest('.infoBox').length==1){
            return;
        }
        $('.mask').removeClass('show');
        this.scrollControl(true);
    };

    return Invitation;
});