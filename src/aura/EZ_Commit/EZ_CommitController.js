({
    doInit : function(component, event, helper) {
        var label = $A.get("$Label.c.DX_API2");
        console.log(label);
        helper.getScrOrgList(component);
        helper.getDetails(component,'UserRepositories','repositoryDetailsList','repository');
    },
    fetchChanges : function(component, event, helper) {
        var user = $("#user").val();
        component.set('v.fetchChangesMap.Userslist',user);
        var dataObj = helper.getDataObj(component.get('v.fetchChangesMap'));
        console.log(dataObj);
        var action = component.get('c.fetchUserChangesFromSfOrg');
        action.setParams(dataObj);
        action.setCallback(this,function(res){
            var response = JSON.parse(res.getReturnValue());
            if(response){
                console.log(response);
                console.log(response['statusCode']);
                console.log(response['Response']);
                console.log(response['Resbody']);
                var xml = response.Resbody;
                var xmlDoc = $.parseXML( xml );
                var $xml = $( xmlDoc );
                var $keys = $xml.find('types');
                var dataObj = {};
                $keys.each(function(){
                    var list = [];
                    $(this).find('members').each(function(){
                        var obj = {};
                        $.each(this.attributes, function() {
                            obj[this.name] = this.value;
                        });
                        list.push(obj)
                    })
                    dataObj[$(this).attr('name')] = list;
                })
                console.log(dataObj);
                var htmlstr='';
                var c=0;
                for(var key in dataObj){
                    var tableStr = '<table class="slds-table slds-table_bordered slds-table_cell-buffer"> <thead> <tr class="slds-text-title_caps"> <th scope="col"> <div class="slds-truncate" title="File Name">File Name</div> </th> <th scope="col"> <div class="slds-truncate" title="Fullname">Fullname</div> </th> <th scope="col"> <div class="slds-truncate" title="Manageablestate">Manageablestate</div> </th> <th scope="col"> <div class="slds-truncate" title="modifieddate">Modified Date</div> </th> </tr> </thead> <tbody>';
                    for(var i=0;i<dataObj[key].length;i++){
                        tableStr+='<tr><td data-label="filename"><div class="slds-truncate" title="filename"><input type="checkbox" id="'+key+'-'+c+'-'+i+'" class="member" name="'+dataObj[key][i]['filename']+'">&nbsp;'+dataObj[key][i]['filename']+'</div></td>';
                        tableStr+='<td data-label="fullname"><div class="slds-truncate" title="fullname">'+dataObj[key][i]['fullname']+'</div></td>';
                        tableStr+='<td data-label="manageablestate"><div class="slds-truncate" title="manageablestate">'+dataObj[key][i]['manageablestate']+'</div></td>';
                        tableStr+='<td data-label="modifieddate"><div class="slds-truncate" title="modifieddate">'+dataObj[key][i]['modifieddate']+'</div></td></tr>';
                    }
                    tableStr += '</tbody></table>'
                    htmlstr+='<div class="slds-section slds-is-open"> <h3 class="slds-section__title"> <button aria-controls="expando-unique-id" aria-expanded="true" class="slds-button slds-section__title-action"> &nbsp;<input type="checkbox" id="'+key+'-'+c+'" class="metadata">&nbsp;<span class="slds-truncate" title="'+key+'">'+key+'</span> </button> <span class="icon-wrapper"><svg class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true"> <use href="/resource/slds/assets/icons/utility-sprite/svg/symbols.svg#switch" /> </svg></span></h3> <div aria-hidden="false" class="slds-section__content" id="expando-unique-id">'+tableStr+'</div></div>'; 
                    c++;
                }
                $("#metadata").html(htmlstr);
                $('.slds-btn-commit').removeClass('slds-hide');
                helper.eventAttacher();
            }
            else{
                console.log('-----------response null--------------');
            }
        });
        $A.enqueueAction(action);
    },
    selectDeloyment:function(component, event, helper) {
        var selectId = event.target.id;
        var index = $("#"+selectId).prop('selectedIndex');
        if(index>0){
            if(selectId=="srcOrg"){
                var destOrgId = $("#"+selectId).find("option:eq("+index+")").attr("data-rec-id");
                console.log('-------'+srcOrg);
                if(destOrgId){
                    component.set('v.fetchChangesMap.sforgid',destOrgId);
                    var action = component.get("c.SalesForceUsersSCMMapping");
                    action.setParams({
                        "destOrgId":destOrgId    
                    })
                    console.log('-------'+destOrgId);
                    action.setCallback(this,function(res){
                        var state = res.getState();
                        var response = JSON.parse(res.getReturnValue());
                        console.log(response);
                        if(state=="SUCCESS" && response.statusCode==200)
                        {
                            var xml = response.Resbody;
                            var xmlDoc = $.parseXML( xml );
                            var $xml = $( xmlDoc );
                            var $keys = $xml.find('user');
                            console.log($keys);
                            var list = [];
                            $keys.each(function() {
                                var obj = {};
                                $.each(this.attributes, function() {
                                    obj[this.name] = this.value;
                                });
                                list.push(obj)
                            });
                            component.set("v.UserList",list);
                        }
                    })
                    $A.enqueueAction(action);  
                }
                
            }
            else if(selectId=="Repository"){
                var repoid = $("#"+selectId).find("option:eq("+index+")").attr("data-rec-id");
                if(repoid){
                    component.set('v.fetchChangesMap.repoid',repoid);
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
                    component.set('v.fetchChangesMap.branch',$("#"+selectId).val());                    
                }
        }
        
    },
    commitChanges:function(component, event, helper) {
        $(".main-body").animate({ scrollTop: 0 }, "fast");
        var metadataMap = {};
        $(".metadata:checked").each(function(){
            var metadata = $(this).attr('id').split('-')[0]
            metadataMap[metadata]=[];
        });
        $(".member:checked").each(function(){
            var arr = $(this).attr('id').split('-');
            var metadataName = arr[0];
            metadataMap[metadataName].push($(this).attr('name'));
            /*var parid = arr.slice(0,-1).join('-');
            console.log($("#"+parid).is(":checked"));
            if (!$("#"+parid).is(":checked")) {
                if(!metadataMap.hasOwnProperty(metadataName)){
                    metadataMap[metadataName]=[];
                }
                metadataMap[metadataName].push($(this).attr('name'));
            }*/
        })
        console.log('-------------------metadataMap---------------------');
        console.log(metadataMap);
        var dataObj={};
        dataObj['usersList']='All';
        dataObj['sforgid']=component.get("v.fetchChangesMap.sforgid");
        dataObj['metadata']=JSON.stringify(metadataMap);
        dataObj['repoid']=component.get("v.fetchChangesMap.repoid");
        dataObj['branch']=component.get("v.fetchChangesMap.branch");
        console.log(dataObj);
        var action = component.get('c.commitChangesToSCM');
        action.setParams(dataObj);
        action.setCallback(this,function(res){
            console.log(res.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})