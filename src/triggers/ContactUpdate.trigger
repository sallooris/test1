trigger ContactUpdate on Account (before insert) {
    
    Map<Id,Account> myMap=Trigger.NewMap;
    
    List<Contact> Con = new List<Contact>();
    List<Contact> cons=[select Id ,Name,accountId from Contact where accountId in : myMap.keySet()];
    For(Contact C:Cons){
        c.phone=myMap.get(c.accountId).Phone;
        con.add(c);
    }
update con;
}