({
    doInit : function(component, event, helper) {
        console.log(component.getElements());
        var content = component.get('v.content');
        var size = component.get('v.size');
        var modal = component.find('modal');
        $A.util.addClass(modal, "slds-modal--"+size);
        var ind = content.search(':');
        if(ind==1){
            $A.createComponent(
                content,
                {
                },
                function(newCmp){
                    if (component.isValid()) {
                        component.find('modal-content').set("v.body", newCmp);
                    }
                }
            );
        }
        else{
            if(document.getElementById('modal')){
                document.getElementById('modal').innerHTML = content;
            }
        }
        
    },
    closeModal : function(component, event, helper) {
        component.set('v.flag',false);
    }
})