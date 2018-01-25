({
    hideModal:function(component, event, helper) {
        helper.setEvent(component);
    },
    addScrOrg:function(component, event, helper) {
        var c=0;
        var username = component.find("username");
        var usernameValue = username.get("v.value");
        var alias = component.find("alias");
        var aliasValue = alias.get("v.value"); 
        var sfedition=component.find("dxEdition"); 
        var sfeditionValue=sfedition.get("v.value");
        helper.clearMessages([username,alias,sfedition]);
        if($A.util.isEmpty(usernameValue)){
            c++;
            username.set("v.errors", [{message: "Please Enter username."}]);
        }
        else{
            var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!usernameValue.match(regExpEmailformat)){
                c++;
                username.set("v.errors", [{message: "Please Enter a Valid Email Address."}]);
            }
        }        
        if($A.util.isEmpty(aliasValue)){
            c++;
            alias.set("v.errors", [{message: "Please Enter alias."}]);
        }
        if(c==0){         
            $('.demo-only,.slds-backdrop,.slds-modal__container').css('visibility','hidden');
            var action = component.get('c.createScracthOrg');
            action.setParams({
                "hubid":component.get('v.hubid'),
                "hubname":component.get('v.hubalias'),
                "hubuserid":component.get('v.hubusername'),
                "scrorgname":aliasValue,
                "scrorgusername":usernameValue,
                "Edition":sfeditionValue
                
            });
            
            action.setCallback(this,function(res){
                console.log('scratchorg');
                var state = res.getState();
                var resData = JSON.parse(res.getReturnValue());
                var statusCode = resData.statusCode;
                var msg=resData.Response;
                console.log(res.getReturnValue());
                console.log(resData.Response);
                console.log(resData.statusCode);
                var xml = resData.Resbody
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $sos = statusCode == 200?$xml.find( "return" ):$xml.find( "faultstring" );
                msg = $sos.text();
                helper.showToast(msg,statusCode);                
                if(state=="SUCCESS"){
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:HubManagement",
                        componentAttributes: {
                            "hubid":component.get('v.hubid'),
                            "hubusername":component.get('v.hubusername'),
                            "hubalias":component.get('v.hubalias')    
                        }
                    });
                    evt.fire();
                    helper.setEvent(component);
                }
            });
            console.log('scr entered');
            $A.enqueueAction(action);
            
        }        
    }    
})
})