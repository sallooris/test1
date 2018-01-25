({
    doInit : function(component, event, helper) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var c = url.searchParams.get("code");
        if(c){
            var state = url.searchParams.get("state");
            console.log(state);
            var objVal = JSON.parse(state);
            console.log(objVal.name);
            var action = component.get('c.loginValidate');
            action.setParams({
                "name":objVal.name,
                "hubname":objVal.alias,
                "code":c
            })
            if(document.getElementById("Accspinner"))
            	document.getElementById("Accspinner").style.display="block";
            action.setCallback(this,function(res){
                var stat = res.getState();
                if(stat == "SUCCESS"){
                    console.log(res.getReturnValue());
                    if(document.getElementById("Accspinner"))
                    document.getElementById("Accspinner").style.display="none";
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:"+objVal.nav,
                        componentAttributes: {}
                    });
                    evt.fire();  
                }
            })
            $A.enqueueAction(action);
        }
    },
    gotoURL : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToURL");
        evt.setParams({
             "url": "https://kcs-dev-ed.lightning.force.com/one/one.app#/sObject/kcs_dev__External_Application__c/list?filterName=Recent"+response.getReturnValue());
              "target": "_blank"
            
        });
        evt.fire();   
    }
})