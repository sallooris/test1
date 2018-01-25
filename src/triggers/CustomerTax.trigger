trigger CustomerTax on Customer__c (before insert,before Update) {
    
    For(Customer__C c:Trigger.New){
        
        CaluclateTX c1=new CaluclatetX();
        C.IT_Tax__c=c1.CalcTax(c.salary__C);
        
    }

}