({
    scriptsLoaded : function(component, event, helper) {
        
    },
    doInit : function(component, event, helper) {
        console.log(component.get('v.hubid'));
        console.log(component.get('v.hubusername'));
        console.log(component.get('v.hubalias'));
        var curTab = window.localStorage.getItem('currentComp');
        var curComp = curTab?curTab:component.get('v.currentComp');
        var curCompAttrs ={
                "hubid":component.get('v.hubid'),
                "hubusername":component.get('v.hubusername'),
                "hubalias":component.get('v.hubalias'),
                "ScrOrgList":component.get('v.ScrOrgList')
            }
        console.log('-----------------curCompAttrs-----------------');
        console.log(curCompAttrs);
        console.log('---------------curComp----------------'+curComp);
        component.set('v.currentComp',curComp);
        var url_string = window.location.href;
        var url = new URL(url_string);
        var c = url.searchParams.get("code");
        if(c){
            var url1 = window.location.href.split('?')[0];
            var compCode = window.location.href.split('?')[1].split('#')[1];
            window.location.href = url1+"#"+compCode; 
        }
        $A.createComponent(
            "c:"+curComp,curCompAttrs,
            function(newCmp){
                if (component.isValid()) {
                    component.find('tab-data').set("v.body", newCmp);
                }
            }
        );
        
        helper.getScrOrgList(component);
        helper.getVersionContrlList(component);
        helper.getDetails(component,'AllCredentials','accesskeyList','accesskey');
        helper.getDetails(component,'UserRepositories','repositoryDetailsList','repository');
        helper.getSfOrgsList(component);
    },
    goToUrl: function(component, event, helper) {
        var soList = component.get('v.ScrOrgList');
        if(soList.length>0){
            var arrComps = ['ScratchOrg_List','Salesforce_Org_Management','VC_Repositories','EZ_Commit','MetaData_Comp'];
            var curEle = component.find("tab"+event.srcElement.tabIndex);
            $('.slds-tabs-list').find("li").removeClass('slds-active');
            $A.util.addClass(event.srcElement.parentNode, "slds-active");
            var curTab = arrComps[event.srcElement.tabIndex];
            window.localStorage.setItem('currentComp',curTab);
            $A.createComponent(
                "c:"+curTab,
                helper.getAttributes(component,curTab),
                function(newCmp){
                    if (component.isValid()) {
                        component.find('tab-data').set("v.body", newCmp);
                    }
                }
            );	
        }
    },
    disp:function(component, event, helper){
        console.log('--------------------------------disp--------------------');
    }
})