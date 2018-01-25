<aura:application extends="force:slds" >	
	<div class="slds" style="margin-top:10px;margin-left:10px;">
		<ltng:require styles="/resource/slds080/assets/styles/salesforce-lightning-design-system-vf.css" />
        <c:button class="slds-button slds-button--neutral" 
                     label="Details" 
                     svgXlinkHref="/resource/slds080/assets/icons/standard-sprite/svg/symbols.svg#account" 
                     svgClass="slds-icon slds-icon-text-default"
                     onclick="{!c.showDetails}"
        />
	</div>
</aura:application>