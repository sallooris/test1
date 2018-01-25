trigger ContactDeletion on Account (before insert) {
    
    List<String> myNames{set ; get;}
    
    for(Account a:Trigger.New){
        
        myNames.add(a.name);
    }
    
    List<Contact> con= [Select id ,Name from Contact where name in :myNames];
    
    delete con;

}