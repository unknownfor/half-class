/**
 * Created by hisihi on 2017/1/14.
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

require(['home','prefixfree'],function(Invitation){
    var url = window.location.href;
    if(url.indexOf('%2F')>0){
        url=url.replace(/\%2F/g,'\/');
    }

    var reg = /id\/[0-9][0-9]*/g,
        id = url.match(reg)[0].toString().replace(/id\//g,'');
    window.Invitation = new Invitation(id,window.hisihiUrlObj.api_url_php);
});