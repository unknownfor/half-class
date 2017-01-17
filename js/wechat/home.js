/**
 * Created by hisihi on 2017/1/16.
 */
define(['base'],function(Base) {

    var Invitation = function (id, url) {
        var that = this;
        this.id = id;
        this.baseUrl = url;
        var eventsName = 'click', that = this;
        if (this.isLocal) {
            eventsName = 'touchend';
            //路径地址解析
            this.baseUrl = this.baseUrl.replace('api.php', 'hisihi-cms/api.php');
        }

        this.downloadBar();

    };


    Invitation.prototype=new Base(config);
    Invitation.constructor=Invitation;
    var p =Invitation.prototype;

    p.downloadBar = function (){
        var wait=10;
        function time(t) {
            if (wait == t) {
                t.removeAttribute("disabled");
                t.value="免费获取验证码";
                wait = 10;
            } else {
                t.setAttribute("disabled", true);
                t.value="重新发送(" + wait + ")";
                wait--;
                setTimeout(function() {
                        time(t)
                    },
                    1000)
            }
        }
        $(document).ready(function(){
            $("#btn").click( function () {

                time(this);
            });
        });

    };


    return Invitation;
});