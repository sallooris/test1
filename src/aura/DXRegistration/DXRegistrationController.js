({
    checkValidation : function(component, event, helper) {
        var c=0;
        var username = component.find("username");
        var usernameValue = username.get("v.value");
        var alias = component.find("alias");
        var aliasValue = alias.get("v.value");        
        helper.clearMessages([username,alias]);
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
            var clientId    = $A.get("$Label.c.DX_ClientId");
            var callbackUrl = $A.get("$Label.c.DX_CallbackURL");
            //window.location.href='https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9d8..z.hDcPLKhdv4nBvYennLRz7oaJgYAQkeidSxL.Jycc2jPtZFPY9.KHcMS7CSJ8SGpdzdWgdZT__N&redirect_uri=https://dx-war-dev-ed.lightning.force.com/one/one.app&prompt=login&login_hint='+usernameValue+'&state={"alias":"'+aliasValue+'","nav":"DevHub_List"}';
            window.location.href='https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id='+clientId+'&redirect_uri='+callbackUrl+'&prompt=login&login_hint='+usernameValue+'&state={"alias":"'+aliasValue+'","nav":"DevHub_List"}';
        }        
    }    
})