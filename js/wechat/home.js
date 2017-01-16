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

        //��������¼�������ɨ�뱨������
        $(document).on(eventsName,'#getSignIn',function () {
            $('.mask').addClass('show');
            that.scrollControl(false);
        });

        //���ɨ�뱨�������ر�������
        $(document).on(eventsName,'.mask', $.proxy(this,'hideSignIn'));

        this.controlLoadingBox(true);//�Ƿ���ʾ���صȴ�����
        window.setTimeout(function () {
            that.loadData();
        }, 100);

        //photoswipe   �鿴���
        new MyPhotoSwipe('.album-ul',{
            bgFilter:true,
        });

    };

    //������
    var config={
        downloadBar:{
            show:true,
            pos:0
        }
    };

    Invitation.prototype=new Base(config);
    Invitation.constructor=Invitation;
    var t =Invitation.prototype;


    //�������
    t.loadData = function(){
        var that = this,
        //http://localhost/hisihi-cms/api.php?s=/FamousTeacher/detail/
            queryPara = {
                url: this.baseUrl + 'FamousTeacher/detail/',
                paraData: {id: this.id},
                sCallback:function(result){
                    //������ݲ�����
                    if(!result.data||result.data.teacher == false){
                        that.controlLoadingBox(false);
                        that.showTips('��ʦ�������ʧ��');
                    }else{
                        that.controlLoadingBox(false);
                        that.loadAllInfo(result);
                    }
                },
                eCallback:function(){
                    that.controlLoadingBox(false);
                    that.showTips('��ʦ�������ʧ��');
                },
                type: 'get',
                async: this.async
            };
        this.getDataAsync(queryPara);
    };

    //����ҳ�淽��
    t.loadAllInfo = function (result){
        this.loadHeadInfo(result),
            this.loadTeacherInfo(result),
            this.loadClassDetail(result),
            this.loadProjectDetail(result),
            this.loadGetSignIn(result),
            this.loadMask(result);
    };

    //���ؿγ���Ϣ
    t.loadHeadInfo = function(result) {
        //�ж������Ƿ����
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
                '<span class="teacherTips">�����ˣ�</span>'+
                '<span class="teacherTitle">'+ teacher +'</span>'+
                titStr +
                '</div>',

            detStr ='<div class="headTeacherDetail" id="teacherClass">'+
                '<div class="teacherTips">�γ̽��ܣ�</div>'+
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
            '<span id="author">'+ '����' + author +'</span>'+
            '<span id="time">'+ this.getTimeFromTimestamp(result.data.create_time,'MM-dd hh:mm') +'</span>'+
            '</div>'+
            '</div>'+
            '<div class="headTeacher">' +   teaStr  + detStr + timeStr + '</div>';
        //���ݲ���������
        $('.head').removeClass('hide');
        $('.head').html(str);
    };

    //��ȡ����ʱ�䣬�γ�ʱ���״̬�ж�
    t.getTimeInfo = function (result) {
        var  str = '',
            statusStr='',
            begin = this.getTimeFromTimestamp(result.data.start_time,'yyyy��MM��dd�� hh:mm');
        statusStr=  '<span class="teacherStatus">(' +this.getDaysBetween(result)+')</span>';
        //���û����д����ʱ�䣬����ʾ����״̬
        if (result.data.start_time == 0){
            begin = '����',
                statusStr ='';
        }
        str =  '<div class="headTeacherDetail" id="teacherTime">'+
            '<div class="teacherTips">����ʱ�䣺</div>'+
            '<div class="teacherDetail">'+
            begin + statusStr+
            '</div>'+
            '</div>';
        return str;
    };

    /*
     * ����ʱ����
     * ��ȡ��ǰʱ�����ʱ������
     * ��ʽΪYYYY-MM-DD
     * */
    t.getDaysBetween = function (result) {
        var now = new Date(),
            t2 = result.data.start_time,
            recordTime=new Date(parseFloat(t2)*1000),
            diff = now -recordTime;
        if (diff > 0) {
            return '�ѽ���';
        }
        return '����������';
    };


    //������ʦ����
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
        //���ݲ���������
        $('#teacher').removeClass('hide');
        $('#teacher').html(str);
    };

    //���ؿγ̱ʼ�(�γ��ѽ���)
    t.loadClassDetail = function(result) {
        //�ж������Ƿ����
        if (!result||!result.data||!result.data.note) {
            return '';
        }
        //���������������״̬������ʾ���ñʼ�
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
                '<span class="contentTitle">���ñʼ�</span>' +
                '</div>' +
                '<div class="contentInfo">' +
                detail +
                '</div>';
        }
        //���ݲ���������
        $('#note').removeClass('hide');
        $('#note').html(str);
    };

    //���ز�����Ʒ(�γ̱���״̬/���߿γ̱ʼ�����Ϊ��)
    t.loadProjectDetail =  function(result) {
        //�ж������Ƿ����
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
            '<span class="contentTitle">������Ʒ����</span>'+
            '</div>'+
            '<ul class="contentInfo album-ul">'+
            strLi+
            '</div>';
        //���ݲ���������
        $('#project').removeClass('hide');
        $('#project').html(str);
    };

    //���ر�����ť
    t.loadGetSignIn = function(result) {
        var str = '<div id="getSignIn"><span>��������</span></div>',
            now = new Date(),
            t2 = result.data.start_time,
            recordTime=new Date(parseFloat(t2)*1000),
            diff = now -recordTime;
        //�жϿγ�״̬���Ƿ���Ԥ��״̬,���������ʾ������ť
        if (diff > 0) {
            //�γ��ѽ���
            str = '';
        }else {
            $('body').append(str);
        }
    };

    //���ص���
    t.loadMask = function(result) {
        //�жϵ����Ƿ�����д���ݣ����򷵻ؿ�
        if (!result||result.data.registration_way == null) {
            return '';
        }
        var str = '',
            detail= this.maskDetailStyle(result);
        str = '<div class="mask">'+
            '<div class="infoBox">'+
            '<div class="infoBoxTitle" id="titleFirst">������ʽ</div>'+
            '<div class="infoBoxDetail">'+
            detail+
            '</div>'+
            '</div>'+
            '</div>';
        $('body').append(str);
    };

    //�������ݷ��룬������ʽ
    t.maskDetailStyle = function (result) {
        var strP = '',
            item,
            str = '',
            detail= result.data.registration_way,
        //ѭ������
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

    //������������֣����𵯴�
    t.hideSignIn = function (e){
        //Ĭ��д��
        var event = window.event || e,
            target=event.srcElement || event.target,
            $target=$(target);
        //�ҵ������div������Ϊ1�ж��Ƿ����
        if($target.closest('.infoBox').length==1){
            return;
        }
        $('.mask').removeClass('show');
        this.scrollControl(true);
    };

    return Invitation;
});