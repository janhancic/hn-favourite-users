chrome.extension.onRequest.addListener ( function ( request, sender, sendResponse ) {
	var users = new Users ();
	var highlightColours = new HighlightColours ();

	if ( request.method === 'getData' ) {
		sendResponse ( {
			users: users.getAll (),
			highlightBackgroundColour: highlightColours.getBackgroundColour (),
			highlightColour: highlightColours.getColour ()
		} );
	} else if ( request.method === 'add' ) {
		if ( users.exists ( request.userName ) === false ) {
			users.add ( request.userName );
		}

		sendResponse ( { ok: 42 } );
	} else if ( request.method === 'remove' ) {
		users.remove ( request.userName );

		sendResponse ( { ok: 42 } );
	}
} );

// open options page when extension is installed
if ( typeof localStorage['installed'] === 'undefined' ) {
	chrome.tabs.create ( { url: chrome.extension.getURL ( 'options.html' ) } );
	localStorage['installed'] = true;
}