trigger Error_Trigger_On_A on A__c (before insert) {
    
 //   List<A__c> list=Triger.New;
    For(A__c a:Trigger.New){
        
        if(a.one__c=='Chandu'){
            a.addError('Wrong message');
        }
    }

}