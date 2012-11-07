chrome.extension.onRequest.addListener ( function ( request, sender, sendResponse ) {
	if ( request.method === 'getData' ) {
		var users = new Users ();

		sendResponse ( {
			users: users.getAll (),
			highlightBackgroundColour: '#ff6600',
			highlightColour: 'white'
		} );
	}
} );

// open options page when extension is installed
if ( typeof localStorage['installed'] === 'undefined' ) {
	chrome.tabs.create ( { url: chrome.extension.getURL ( 'options.html' ) } );
	localStorage['installed'] = true;
}