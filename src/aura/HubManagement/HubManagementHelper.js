({
    getVersionContrlList : function(comp) {
        var action = comp.get("c.Vcsplugins");
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200){
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $plugins  = $xml.find( "plugin" );
                var repositoryList = [];
                $plugins.each(function() {
                    if($(this).attr('type')=="SC")
                        repositoryList.push($(this).attr('uilabel'));
                });
                comp.set("v.repositoryList",repositoryList);
                
            }
        });
        $A.enqueueAction(action);
    },
    getDetails:function(comp,funName,attrName,xmlKey){
        var action = comp.get('c.'+funName);
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200){
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $keys = $xml.find( xmlKey );
                var list = [];
                $keys.each(function() {
                    var obj = {};
                    $.each(this.attributes, function() {
                        if(this.specified) {
                            obj[this.name] = this.value;
                        }
                    });
                    list.push(obj)
                });
                comp.set("v."+attrName,list);
                console.log('---------------------------list-------------------');
                console.log(comp.get("v."+attrName));
            }
        })
        $A.enqueueAction(action);        
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
    },
    getSfOrgsList:function(comp){
        var action = comp.get("c.SanboxesHistory");
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200){
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $keys = $xml.find('sandbox');
                var list = [];
                $keys.each(function() {
                    var obj = {};
                    $.each(this.attributes, function() {
                        if(this.specified) {
                            obj[this.name] = this.value;
                        }
                    });
                    obj.env = $(this).find("environment").text();
                    obj.instanceurl = $(this).find("instanceurl").text();
                    list.push(obj)
                });
                comp.set("v.SfOrgList",list);
            }
        });
        $A.enqueueAction(action);        
    },
    getAttributes:function(component,curTab){
        var tabsObj = { 
            'ScratchOrg_List':{
                "hubid":component.get('v.hubid'),
                "hubusername":component.get('v.hubusername'),
                "hubalias":component.get('v.hubalias'),
                "ScrOrgList":component.get('v.ScrOrgList')
            },
            'Salesforce_Org_Management':{
                hubInfo:{
                    "hubid":component.get('v.hubid'),
                    "hubusername":component.get('v.hubusername'),
                    "hubalias":component.get('v.hubalias')
                },
                SfOrgList:component.get('v.SfOrgList')
            },
            'VC_Repositories':{
                "accesskeyList":component.get('v.accesskeyList'),
                "repositoryDetailsList":component.get('v.repositoryDetailsList'),
                "repositoryList":component.get('v.repositoryList')                          
            },
            'EZ_Commit':{
                'ScrOrgList':component.get('v.ScrOrgList'),
                'repositoryDetailsList':component.get('v.repositoryDetailsList'),
                "hubid":component.get('v.hubid'),
                "hubusername":component.get('v.hubusername'),
                "hubalias":component.get('v.hubalias')
                
            },
            'MetaData_Comp':{
                'ScrOrgList':component.get('v.ScrOrgList'),
                'repositoryDetailsList':component.get('v.repositoryDetailsList'),
                'repositoryList':component.get('v.repositoryList'),
                "hubid":component.get('v.hubid'),
                "hubusername":component.get('v.hubusername'),
                "hubalias":component.get('v.hubalias') 
            }
        };
        
        return tabsObj[curTab];
    }
})