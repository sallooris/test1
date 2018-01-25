({
    getDataObj:function(dataObj){
        var obj ={};
        for(var key in dataObj){
            obj[key] = dataObj[key];
        }
        return obj;
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
    eventAttacher:function(){
        $(document).on('click','.metadata',function(e){
            var id = $(this).attr('id');
            $('input[id*="'+id+'-"]').prop('checked',$(this).prop('checked'));
            e.stopPropagation();
        })
        
        $(document).on('click','.member',function(){
            var id = $(this).attr('id').split('-').slice(0,-1).join('-');
            console.log(id);
            if(!$(this).is(':checked')){
                $('input[id="'+id+'"]').prop('checked',false);
            }
        })
        $(document).on('click','.slds-section__title-action',function(){
            $(this).parent().parent().toggleClass('slds-is-open');
        })
    }
})