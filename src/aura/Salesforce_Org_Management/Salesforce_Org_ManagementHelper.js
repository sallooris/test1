({
    showToast : function(resp) {
        var xml = resp.Resbody;
        var xmlDoc = $.parseXML( xml );
        var $xml = $( xmlDoc );
        var code = resp.statusCode;
        var msg = $xml.find( code==200?"return":"faultString" ).text();   
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": code!=200?"Error!":"Success!",
            "message": msg
        });
        toastEvent.fire();
    }
})