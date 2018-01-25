({
	doInit : function(component, event, helper) {
        $('[data-aljs="icon-group"]').iconGroup();
        var vcsList         = component.get("v.repositoryList");
        var accesskeyList   = component.get("v.accesskeyList");
        var repoDetailsList = component.get("v.repositoryDetailsList");
        if(vcsList.length==0)    	     helper.getVersionContrlList(component);
        if(accesskeyList.length==0)      helper.getDetails(component,'AllCredentials','accesskeyList','accesskey');
        if(repoDetailsList.length==0)    helper.getDetails(component,'UserRepositories','repositoryDetailsList','repository');
	},
    showModal: function(component, event, helper) {
        component.set('v.isModalVisible',true);
    },
    showRepoList: function(component, event, helper) {
        component.set('v.isModalVisible',false);
    },
    handleComponentEvent: function(component, event, helper) {
        helper.getDetails(component,'AllCredentials','accesskeyList','accesskey');
    }
})