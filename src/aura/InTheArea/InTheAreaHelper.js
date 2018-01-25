({
    getLocalList: function(component) {
        var searchTerm = component.get("v.defaultSearch");
        var location = component.get("v.location");
        var action = component.get("c.getLocal");
        location = JSON.parse(location);
        action.setParams({
            "searchTerm": searchTerm,
            "lat": location.coords.latitude,
            "lon": location.coords.longitude
        });
        action.setCallback(this, function(response) {
            this.doLayout(response, component);
        });
        $A.enqueueAction(action);
    },
    // add doLayout function
    doLayout: function(response, component) {
        var data = JSON.parse(response.getReturnValue());
        component.set("v.restaurantList", data.bizArray);
        console.log("The Data: ", data);
    }    
})