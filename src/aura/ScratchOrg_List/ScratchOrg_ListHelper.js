({
    showToast : function() {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "Selected Salesforce DX Scratch Org deleted successfully."
        });
        toastEvent.fire();
    },
    getScrOrgList:function(comp){
        var action = comp.get('c.ScratchOrgList');
        action.setParams({
            "hubid":comp.get("v.hubid"),
            "hubname":comp.get("v.hubalias")
        });
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state == 'SUCCESS'){
                var xml = res.getReturnValue().toString();
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $sos = $xml.find( "sandbox" );
                var soList = [];
                $sos.each(function(){
                    var obj = {};
                    obj.name = $(this).attr("name");
                    obj.username = $(this).attr("username");
                    obj.url = $(this).attr("url");
                    obj.date = $(this).attr("date");
                    obj.expirydate = $(this).attr("expirydate");
                    obj.hubuserid = $(this).attr("hubuserid");
                    obj.id =$(this).attr("id");
                    obj.orgurl = $(this).attr("orgurl");
                    soList.push(obj);
                   
                });
                comp.set('v.ScrOrgList',soList);
            }
        });
        $A.enqueueAction(action);
    }
})