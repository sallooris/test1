({
    handleClick : function(component, event, helper) {
        var click = component.getEvent("dateCellClick");
        click.fire();
    }
})