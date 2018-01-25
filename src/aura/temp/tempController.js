({
    doInit : function(component, event, helper) {
        /*if(!window.localStorage.getItem("devListSize")){
            window.localStorage.setItem("devListSize", 0);
        }*/
        window.localStorage.removeItem('currentComp');
        window.localStorage.removeItem('currentCompAttributes');
        var url_string = window.location.href;
        var url = new URL(url_string);
        var c = url.searchParams.get("code");
        var state = url.searchParams.get("state");
        var objVal = JSON.parse(state);        
        if(c && objVal.nav=='DevHub_List'){
            if(document.getElementById("Accspinner"))
                document.getElementById("Accspinner").style.display="block";
            var action = component.get('c.createDevhub');
            action.setParams({
                "devUsername":objVal.name,
                "hubname":objVal.alias,
                "code":c
            })
            action.setCallback(this,function(res){
                console.log('res');
                console.log(res.getReturnValue());
                var state = res.getState();
                var resp = JSON.parse(res.getReturnValue());
                var xmlDoc = $.parseXML(resp.Resbody);
                var $xml = $( xmlDoc );
                if(state=="SUCCESS" && resp.statusCode==200){
                    var $hubs = $xml.find( "return" );
                    var statusMsg = $hubs.text();
                    helper.showToast(statusMsg,resp.statusCode);
                    helper.getDevHubList(component); 
                }
                else{
                    var $hubs = $xml.find( "faultstring" );
                    var statusMsg = $hubs.text();
                    helper.showToast(statusMsg,resp.statusCode);
                    helper.getDevHubList(component); 
                }
                
            })
            $A.enqueueAction(action);
        }
        else if(c && objVal.nav=='HubManagement'){
            console.log('--------------------------objVal.data--------------');
            console.log(objVal.data.sforgname);
            var dataObj = objVal.data;
            console.log(objVal.hubInfo);
            var hubInfo = objVal.hubInfo;
            var action = component.get('c.SFOrgsWithOAuth');
            dataObj.code = c;
            action.setParams(dataObj);
            action.setCallback(this,function(res){
                var state = res.getState();
                var resp = JSON.parse(res.getReturnValue());
                var xmlDoc = $.parseXML(resp.Resbody);
                var $xml = $( xmlDoc );
                if(state=="SUCCESS" && resp.statusCode==200){
                    var $hubs = $xml.find( "return" );
                    var statusMsg = $hubs.text();
                    helper.showToast(statusMsg,resp.statusCode);
                    helper.redirectToHubMgmt(hubInfo);
                }
                else{
                    var $hubs = $xml.find( "faultstring" );
                    var statusMsg = $hubs.text();
                    helper.showToast(statusMsg,resp.statusCode);
                    helper.redirectToHubMgmt(hubInfo);
                }
            })
            $A.enqueueAction(action);
        }
        else{
            helper.getDevHubList(component);
        }
    }
})