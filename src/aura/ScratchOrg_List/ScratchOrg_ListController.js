({
    doInit: function(component, event, helper) {
        var locale = $A.get("$Locale.useremail");
        console.log("You are using " + locale);
        console.log('scratch org list');
        var soList = component.get('v.ScrOrgList');
        if(soList.length==0) helper.getScrOrgList(component);
    },
    gotoURL : function(component, event, helper) {
        $A.createComponent(
            "c:Create_Scractch_Org",{},
            function(newCmp){
                if (component.isValid()) {
                    component.find('main').set("v.body", newCmp);
                }
            }
        );
    },
    showModal: function(component, event, helper) {
        component.set('v.isModalVisible',true);
    },
    unRegister:function(component, event, helper) {
        var action = component.get("c.ScratchOrgDelete");
        action.setParams({
            "soid":event.target.getAttribute("data-soid"),
            "soname":event.target.getAttribute("data-soname"),
            "sousername":event.target.getAttribute("data-sousername"),
            "hubuserid":event.target.getAttribute("data-hubid")
        });
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=="SUCCESS"){
                helper.showToast();
                helper.getScrOrgList(component);
                console.log(res.getReturnValue());
            }
            
        })
        $A.enqueueAction(action);
    }
})