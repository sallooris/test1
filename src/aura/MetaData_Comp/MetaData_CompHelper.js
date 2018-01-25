({
	getDeploymentFrom : function(component) {
		if($("#DeploymentFrom").val()==-1){
            component.set("v.isVersionControl",false);
            component.set("v.isSourceOrg",false);
        }
        else if($("#DeploymentFrom").val()=="sandbox"){
            component.set("v.isVersionControl",false);
            component.set("v.isSourceOrg",true);
        }
        else if($("#DeploymentFrom").val()=="scmfullprofilespermissionsets"){
            component.set("v.isVersionControl",true);
            component.set("v.isSourceOrg",false);
            component.set('v.metaDataMap.dpmsource',"scmfullprofilespermissionsets");
        }
	},
    getDataObj:function(dataObj){
        var obj ={};
        for(var key in dataObj){
            obj[key] = dataObj[key];
        }
        return obj;
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
    }
})