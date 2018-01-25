({
    doInit:function(component, event, helper){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var c = url.searchParams.get("code");
        if(c){
            var url1 = window.location.href.split('?')[0];
            var compCode = window.location.href.split('?')[1].split('#')[1];
            window.location.href = url1+"#"+compCode; 
        }
        var sfsList = component.get("v.SfOrgList");
        var action = component.get("c.SanboxesHistory");
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
                component.set("v.SfOrgList",list);
                console.log('----------------sfOrgsList-----------------------');
                console.log(component.get("v.SfOrgList"));
            }
            else{
                helper.showToast(response);
            }
        });
        $A.enqueueAction(action);
    },
    showModal:function(component, event, helper){
        component.set('v.isNew',true);
    }
})