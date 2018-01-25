({
    getSubMebers : function(component,label,xml) {
        var metadataList = component.get("v.metadataList");
        for(var i=0;i<metadataList.length;i++){
            if(metadataList[i]['name']==label){
                if(metadataList[i]['members'].length==0){
                    var xmlDoc = $.parseXML( xml );
                    var $xml = $( xmlDoc );
                    var $keys = $xml.find( 'members' );
                    var list = [];
                    $keys.each(function(){
                        if($(this).text().length>0){
                            var obj = {};
                            obj['name'] = $(this).text();
                            obj['isSel'] = false;
                            list.push(obj);
                        }
                    })
                    console.log(list);
                    metadataList[i]['members'] = list;
                    console.log(metadataList[i]);                      
                }
                else{
                    metadataList[i]['members'] = [];
                }
                component.set("v.metadataList",metadataList);
                break; 
            }
        } 
    },
    eventattacher:function(){
        $(document).on('click',':checkbox',function(){
            var id = $(this).attr('id');
            var arr = id.split('-');
            if(arr.length==3){
                if(!$(this).prop("checked")){
                    var parId = arr.slice(0,-1).join('-');
                    console.log(parId);
                    $("#"+parId).prop("checked",false);
                }
            }
            else{
                $("input[id*='"+id+"-']").prop("checked",$(this).prop('checked'));
            }
            
        });
    },
    getDeployReport:function(comp,response){
        if(response.statusCode==200){
            var accesskeyList = this.getDataObj(response,'iteration');
            console.log("=-----------------------accesskeyList-----------------");
            console.log(accesskeyList);
            var asyncid = accesskeyList[0]['asyncid'];
            console.log("=-----------------------asynicid-----------------"+asyncid);
            var action = comp.get("c.DeploymentStatus");
            action.setParams({
                "destOrgId":comp.get("v.metaDataMap.destOrgId"),
                "asyncid":asyncid
            })
            action.setCallback(this,function(res){
                var response = JSON.parse(res.getReturnValue());
                console.log(response.Resbody);
                if(response.statusCode==200){
                    comp.set("v.isMetadataMembersVisible",false);
                    comp.set('v.deploymentReport.report',this.getDataObj(response,'return')[0]);
                    comp.set('v.deploymentReport.success',this.getDataObj(response,'componentsuccess'));
                    comp.set('v.deploymentReport.failure',this.getDataObj(response,'componentfailure'));
                    console.log('----------------deploymentReport---------------');
                    console.log(comp.get('v.deploymentReport'));
                    comp.set('v.isMetadataReportVisible',true);
                }
                
            })
            $A.enqueueAction(action);
            comp.set("v.deploymentOrgInfo",accesskeyList[0]);
        }
    },
    getDataObj:function(response,title){
            var xml = response.Resbody;
            var xmlDoc = $.parseXML( xml );
            var $xml = $( xmlDoc );
            var $accesskeys = $xml.find( title );
            var accesskeyList = [];
            $accesskeys.each(function() {
                var obj = {};
                $.each(this.attributes, function() {
                        obj[this.name] = this.value;
                });
                accesskeyList.push(obj)
            });
           return accesskeyList;
    }
})