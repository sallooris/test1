({
    showToast : function(msg,code) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": code!=200?"Error!":"Success!",
            "message": msg
        });
        toastEvent.fire();
    },
    getDevHubList :  function(comp,flag,devList) {
        var action = comp.get('c.getDevHubList');
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state == "SUCCESS"){
                var xml = res.getReturnValue();
                console.log(xml);	
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $hubs = JSON.parse($xml.find( "return" ).text());
                
               /* var xmlDoc = $.parseXML( xml );
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
                console.log('Devhublist');
                console.log(hubList);*/ 
                comp.set('v.DevHubList',$hubs.salesForceDxHubs);
                /*if(hubList.length>window.localStorage.getItem("devListSize")){
                    //this.showToast("Salesforce DX HUB has been registered successfully!",200);
                }
                window.localStorage.setItem("devListSize", hubList.length);*/
                	 var hubList = comp.get('v.DevHubList');
                if(hubList.length>0){
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:DevHub_List",
                        componentAttributes: {
                            "DevHubList":hubList
                        }
                    });
                    evt.fire();
                }
                else{
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:DX_Home",
                        componentAttributes: {
                        }
                    });
                    evt.fire(); 
                }
            }
        })
        $A.enqueueAction(action);
    },
    redirectToHubMgmt:function(hubInfo){
        var evt = $A.get("e.force:navigateToComponent");
        hubInfo.currentComp="Salesforce_Org_Management";
        evt.setParams({
            componentDef : "c:HubManagement",
            componentAttributes: hubInfo
        });
        evt.fire();
    }
})