({
    getHubList :  function(comp) {
        console.log('----entered----');
        var action = comp.get('c.getDevHubList');
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state == "SUCCESS"){
                console.log('Devhublist');
                console.log(res.getReturnValue());
                var xml = res.getReturnValue().toString();
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $hubs = $xml.find( "sfdxhub" );
                var hubList = [];
                $hubs.each(function(){
                    var obj = {};
                    obj.hubid = $(this).find('uid').text();
                    obj.alias = $(this).find('hubname').text();
                    obj.username = $(this).find('username').text();
                    obj.instanceurl = $(this).find('instanceurl').text();
                    obj.orgname = $(this).find('orgname').text();
                    hubList.push(obj);
                });
                console.log(hubList);
                comp.set('v.DevHubList',hubList);
            }
        })
        $A.enqueueAction(action);
    },
    showToast : function(msg,code) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": code!=200?"Error!":"Success!",
            "message": msg
        });
        toastEvent.fire();
    },
    getResponseDetails:function(res,tag){
        var resObj = {};
        var xmlDoc = $.parseXML( res.Resbody );
        console.log(res.Resbody);
        var $xml = $( xmlDoc );
        resObj.msg = $xml.find( tag ).text();
        resObj.code = res.statusCode;
        return resObj;
    }
})