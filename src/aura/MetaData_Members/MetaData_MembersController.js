({
    checkToggle : function(component, event, helper) {
        helper.eventattacher();
    },
    getDataMemebrs : function(component, event, helper) {
        var action = component.get("c.MembersForMetadataType");
        var Metadatatype = event.target.getAttribute("data-label")
        action.setParams({
            "Metadatatype":Metadatatype,
            "labelName":component.get("v.metaDataMap.labelName"),
            "dpmsource":component.get("v.metaDataMap.dpmsource")
        })
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200)
            {
                var xml = response.Resbody;
                helper.getSubMebers(component,Metadatatype,xml);
            }
        });
        $A.enqueueAction(action);
    },
    exeDeploy:function(component, event, helper) {
        $(".main-body").animate({ scrollTop: 0 }, "fast");
        var len = $(".sub-metadata:checked").length;
        var metadataMap = {};
        $(".metadata:checked").each(function(){
                metadataMap[$(this).attr('name')]=[];
        });
        $(".sub-metadata:checked").each(function(){
            var metadataName = $(this).attr('data-parent-name');
            var parid = $(this).attr("data-parentid");
            console.log($("#"+parid).is(":checked"));
            if (!$("#"+parid).is(":checked")) {
                if(!metadataMap.hasOwnProperty(metadataName)){
                    metadataMap[metadataName]=[];
                }
                metadataMap[metadataName].push($(this).attr('name'));
            }
        })
        console.log('-------------------metadataMap---------------------');
        console.log(metadataMap);
        component.set('v.deployMetaDataMap',metadataMap);
        var dataObj={};
        var action = component.get('c.deployMetadata');
        dataObj["destOrgId"] = component.get("v.metaDataMap.destOrgId");
        dataObj["agentid"] = component.get("v.agent");
        dataObj["labelname"] = component.get("v.metaDataMap.labelName");
        dataObj["dpmsource"] = component.get("v.metaDataMap.dpmsource");
        dataObj["metadata"] = JSON.stringify(component.get("v.deployMetaDataMap"));
        dataObj["repoid"] = component.get("v.metaDataMap.repoid");
        dataObj["type"] = component.get("v.metaDataMap.type");
        dataObj["branch"] = component.get("v.metaDataMap.branch");
        console.log(dataObj);
        action.setParams(dataObj);
        action.setCallback(this,function(res){
            var response = JSON.parse(res.getReturnValue());
            var state = res.getState();
            console.log(response.Resbody);
            if(state=="SUCCESS"){
                helper.getDeployReport(component,response);
            }
        })
        $A.enqueueAction(action);
    }
    
})