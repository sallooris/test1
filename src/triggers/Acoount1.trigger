trigger Acoount1 on Account (before insert) {
    
    
    for(Account a:trigger.New){
        
        a.name='mr'+a.name;
    }

}