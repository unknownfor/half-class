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
            //Â·¾¶
            this.baseUrl = this.baseUrl.replace('api.php', 'hisihi-cms/api.php');
        }


    };


    Invitation.prototype=new Base(config);
    Invitation.constructor=Invitation;
    var t =Invitation.prototype;

    return Invitation;
});