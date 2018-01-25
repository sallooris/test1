trigger Branch_CodeUpdate on Account (before insert) {
    public String aid{set ; get;}
    Id accountId {set ; get;}
Account[] allChildren = new Account[] {};
Set<Id> parentIds = new Set<Id>{accountId};
    
    for(Account acc:Trigger.New){
         aid=acc.id;
        List<Account> a= [select ID,Name,Parent.Branch_Code__c,ParentID,Parent.Name,Branch_Code__c,Update_Field__c from Account ];
        List<AggregateResult> ct = [Select count(Branch_Code__c) cnt from Account where Id = :a]; 
        System.debug('a'+a);
        System.debug('ct'+ct);
        
        for(AggregateResult c: ct){
            System.debug('c'+c);
           
            Integer branchcode=(Integer)c.get('cnt');
            
            
            if(branchcode==1){
                       acc.Branch_Code__c='Ad-11';
            }
            if(branchcode==2 ){ 
                       acc.Branch_Code__c='Ad-12';
            }
                else
                    if(branchcode==3 ){
                        acc.Branch_Code__c='Ad-13';
                    }
               else
                   
                    if(branchcode==4 ){
                        acc.Branch_Code__c='Ad-111';
                    }
              else 
                  if(branchcode==5 ){
                      acc.Branch_Code__c='Ad-112';
                  }
            else 
                  if(branchcode==6  ){
                      acc.Branch_Code__c='Ad-113';
                  }
            
        }
        
    }
}