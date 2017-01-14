/**
 * Created by hisihi on 2017/1/14.
 */
/**
 * Created by hisihi on 2016/11/22.
 */
requirejs.config({
    baseUrl: window.hisihiUrlObj.js,
    paths: {
        $:'zepto.min',
        fx:'sharecommon/fx_v1.1',
        fastclick:'sharecommon/fastclick',
        prefixfree:'sharecommon/prefixfree.min',
        base:'sharecommon/base-1.1',
        photoswipe:'sharecommon/photoswipe/photoswipe.min',
        photoswipeui:'sharecommon/photoswipe/photoswipe-ui-default.min',
        myPhotoSwipe:'sharecommon/photoswipe/myphotoswipe',
        async:'sharecommon/async',
        home:'wehchat/wechat',
    },
    shim: {
        $:{
            output:'$'
        },
        fx:{
            steps:['$'],
            output:'fx'
        },
        prefixfree:{
            output:'prefixfree'
        },
    }
});

require(['home','prefixfree'],function(fTeacher){
    var url = window.location.href;
    if(url.indexOf('%2F')>0){
        url=url.replace(/\%2F/g,'\/');
    }

    var reg = /id\/[0-9][0-9]*/g,
    //微信老师为uid还是id
        id = url.match(reg)[0].toString().replace(/id\//g,'');
    window.fTeacher = new fTeacher(id,window.hisihiUrlObj.api_url_php);
});