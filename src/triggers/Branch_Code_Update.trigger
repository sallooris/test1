trigger Branch_Code_Update on Branch__c (before update) {
    
    
    // Branch is a Parent object
    for(Branch__c b: Trigger.New)
    {
        // Branch1 ,Branch2,Branch3 are 3 sub branches of
        // Branch Object (Parent child relation ship)
        if(b.Branch1__c== Null && b.Branch2__c==NULL && b.Branch3__c==NULL){
            
           b.Branch_Code__c= 'Ad-1';
            
        }
        else
            // if user select sub branch1 then Branch code will be "Ad-11"
            If(b.Branch1__c!=NULL && b.Branch2__c==NULL && b.Branch3__c==NULL){
             System.debug('b.Branch1__r.Branch_Code__c' + b.Branch1__r.Branch_Code__c);
           b.Branch_Code__c=b.Branch1_formula__c	;
            }
                
        else
            // if user select sub branch1 then Branch code will be "Ad-12"
            If(b.Branch1__c==NULL && b.Branch2__c!=NULL && b.Branch3__c==NULL){
            
             b.Branch_Code__c=b.Branch2_formula__c;
            }
        
        else
            // if user select sub branch1 then Branch code will be "Ad-13"
            If(b.Branch1__c==NULL && b.Branch2__c==NULL && b.Branch3__c!=NULL){
            
             b.Branch_Code__c=b.Branch3_formula__c;
            }

        
    }

}