({
	goToNewPage: function(component, event, helper) {

    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
        "url": "https://kcs-dev-ed.lightning.force.com/one/one.app#/n/kcs_dev__test1"
    });

    urlEvent.fire();
}
})