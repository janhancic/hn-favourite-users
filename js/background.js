var users = new Users ();

chrome.extension.onRequest.addListener ( function ( request, sender, sendResponse ) {
	if ( request.method === 'getUsers' ) {
		sendResponse ( users.getAll () );
	}
} );

// open options page when extension is installed
if ( typeof localStorage['installed'] === 'undefined' ) {
	chrome.tabs.create ( { url: chrome.extension.getURL ( 'options.html' ) } );
	localStorage['installed'] = true;
}