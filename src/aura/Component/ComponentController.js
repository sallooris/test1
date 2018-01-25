({
    doInit : function(component, event) {

        var action = component.get("c.findApps");
        action.setCallback(this, function(a) {



            // the function that reads the url parameters
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            //set the src param value to my src attribute
            component.set("v.src", getUrlParameter('src'));



        	var settings = a.getReturnValue();            
        });
        $A.enqueueAction(action);       
    }
})