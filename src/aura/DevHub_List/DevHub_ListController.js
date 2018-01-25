({
    doInit:function(component, event, helper) {
        var url = window.location.href.split('?')[0];;
        window.location.href = url;
    },
    goToScratchOrgList : function(component, event, helper) {
        var id = event.target.id.split('-')[1];
        console.log(event.target.getAttribute("data-username"));
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:HubManagement",
            componentAttributes: {
                "hubid":event.target.getAttribute("data-recId"),
                "hubusername":event.target.getAttribute("data-username"),
                "hubalias":event.target.getAttribute("data-alias")
            }
        });
        evt.fire();
    },
    showModal: function(component, event, helper) {
        component.set('v.isModalVisible',true);
    },
    unRegister: function(component, event, helper) {
        var id = event.target.id.split('-')[1];
        var r = confirm(" Do you want to un-registerd Dev Hub");
        console.log(r);
        if (r == true) {
            var action = component.get('c.unregisterDevHub');
            console.log(id);
            action.setParams({
                "id":id
            });
            action.setCallback(this,function(res){
                var state = res.getState();
                console.log('unregister devhub');
                console.log(res.getReturnValue());
                var resp = JSON.parse(res.getReturnValue());
                if(state=="SUCCESS"){
                    var url = window.location.href.split('?')[0];
                    window.location.href = url;
                    var resObj = helper.getResponseDetails(resp,'return');
                    helper.showToast(resObj.msg,resObj.code);
                    helper.getHubList(component);
                }
                else{
                    var resObj = helper.getResponseDetails(resp,'faultstring');
                	helper.showToast(resObj.msg,resObj.code);
                }
            })
            $A.enqueueAction(action);        
        }        
        
    }
})