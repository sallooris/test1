({
    doInit:function(component, event, helper){
        helper.getScrOrgList(component);
        helper.getVersionContrlList(component);
        helper.getDetails(component,'UserRepositories','repositoryDetailsList','repository');
    },
    selectDeloyment:function(component, event, helper) {
        var selectId = event.target.id
        var index = $("#"+selectId).prop('selectedIndex');
        if(selectId=="DeploymentFrom"){
            helper.getDeploymentFrom(component);
        }
        else if(selectId=="VersionControl"){
            console.log(index);
            var versionCtrl =$("#"+selectId).find("option:eq("+index+")").attr("data-vc");
            console.log(versionCtrl);
            if(versionCtrl){
                component.set('v.metaDataMap.type',versionCtrl);
                component.set('v.versionCtrl',versionCtrl); 
            }
            
        }
            else if(selectId=="Repository"){
                var repoid = $("#"+selectId).find("option:eq("+index+")").attr("data-rec-id");
                if(repoid){
                    component.set('v.metaDataMap.repoid',repoid);
                    var action = component.get("c.Branches");
                    action.setParams({
                        "repoid":repoid
                    })
                    action.setCallback(this,function(res){
                        var state = res.getState();
                        var response = JSON.parse(res.getReturnValue());
                        console.log(response);
                        if(state=="SUCCESS" && response.statusCode==200)
                        {
                            var xml = response.Resbody;
                            var xmlDoc = $.parseXML( xml );
                            var $xml = $( xmlDoc );
                            var $keys = $xml.find('branch');
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
                            component.set("v.BranchList",list);
                        }
                    })
                    $A.enqueueAction(action);                
                }
                
            }
                else if(selectId=="Branch"){
                    console.log($("#"+selectId).val());
                    component.set('v.metaDataMap.branch',$("#"+selectId).val());
                }
                    else if(selectId=="srcOrg"){
                        var destOrgId = $("#"+selectId).find("option:eq("+index+")").attr("data-rec-id");
                        if(destOrgId){
                            component.set('v.metaDataMap.destOrgId',destOrgId);
                        }
                    }
    },
    retrieveMetaData:function(component, event, helper) {
        $(".main-body").animate({ scrollTop: 0 }, "fast");
        console.log(component.get('v.metaDataMap'));
        /*// testing start
        var obj = {"branch" : "master", "destOrgId" : "5f521105a546d8c8c9fa225ff77f0a1c", "dpmsource" : "scmfullprofilespermissionsets", "labelName" : "Deploy12", "repoid" : "4A8BF6292BFD5332CE645E8F60E0420E", "type" : "GIT" };
        component.set('v.metaDataMap',obj);
        // testing end*/
        var dataObj = helper.getDataObj(component.get('v.metaDataMap'));
        var action = component.get("c.Agents");
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200)
            {
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $key = $xml.find('agent').attr("id");
                component.set('v.agent',$key);
            }
        });
        $A.enqueueAction(action);
        action = component.get("c.SourcePackageManifest");
        action.setParams(dataObj);
        action.setCallback(this,function(res){
            var state = res.getState();
            var response = JSON.parse(res.getReturnValue());
            console.log(response);
            if(state=="SUCCESS" && response.statusCode==200)
            {
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $keys = $xml.find( 'type' );
                var list = [];
                $keys.each(function() {
                    var obj = {};
                    obj['name'] = $(this).attr('name');
                    obj['members'] = [];
                    obj['isSel'] = false;
                    list.push(obj);
                });
                component.set('v.metadataList',list);
                console.log('------------------list---------------');
                console.log(component.get('v.metadataList'));
                component.set('v.isVisible',false);
                component.set('v.isMetadataMembersVisible',true);
            }
        });
        $A.enqueueAction(action)
    },
    changeTab:function(component, event, helper) {
        $('.slds-tabs_scoped__nav').find("li").removeClass('slds-is-active');
        $A.util.addClass(event.srcElement.parentNode, "slds-is-active");
        $(".slds-tabs_scoped__content").removeClass('slds-show');
        $(".slds-tabs_scoped__content").addClass('slds-hide');
        var id = $('.slds-is-active').find('a').attr('id').split('__')[0];
        $("#"+id).addClass("slds-show");        
    }
})