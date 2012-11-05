var users = new Users ();

chrome.extension.onRequest.addListener ( function ( request, sender, sendResponse ) {
	if ( request.method === 'getUsers' ) {
		sendResponse ( users.getAll () );
	}
} );