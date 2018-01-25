({
    setEvent : function(component) {
        component.set('v.flag',false);
    },
    clearMessages : function(arrComps) {
        for(var i=0;i<arrComps.length;i++){
            arrComps[i].set("v.errors", [{message: ""}]);
        }
    },
    showToast : function(msg,code) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": code!=200?"Internal Server Error!":"Success!",
            "message": msg+"."
        });
        toastEvent.fire();
    }
})