<aura:application >
	
    <link href='/Resource/bootstrap/' rel="stylesheet"/>

    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">Lightning Contacts</a>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <c:SearchBar />
                <c:ContactList />
            </div>
             <div class="col-sm-8">
            <c:ContactDetails />
        </div>
        </div>
    </div>

</aura:application>