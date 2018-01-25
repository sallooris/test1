trigger helloWorldAccountTrigger on Account
(before insert) {
HelloWorld.addHelloWorld(Trigger.new);
}