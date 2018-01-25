trigger Price_Update on A__c (before insert ,before update) {
    
    List<A__C> books=Trigger.New;
    Price_Update_on_A.Asprice(books);

}