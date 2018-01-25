({
    handleClick2: function(component, event, helper) {
     //   var btnClicked = event.getSource().get("v.label");         // the button
      //  var btnMessage = btnClicked.get("v.label"); // the button's label
      console.log("handleClick2: Message: " + newMessage);

        component.set("v.message" ,newMessage);     // update our message
    }
})