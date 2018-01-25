({
	 packItem: function(component, event, helper) {
       
        var btn= event.getSource();
		var BtnMessage =btn.get("v.label");
        var a = component.get("v.item",true);
        a.Packed__c = true;
        component.set("v.item",a);
        component.set("v.item",BtnMessage);
        var btnClicked = event.getSource();
        btnClicked.set("v.disabled",true);     
     }
})