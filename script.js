// utils
var forEach = Array.prototype.forEach;

chrome.extension.sendRequest ( { method: 'getUsers' }, function ( usersToHighlight ) {
	console.log ( usersToHighlight );

	// get the background colour of the top navigation bar
	var highlightColour = document.querySelector ( 'table:first-child td:first-child' ).getAttribute ( 'bgcolor' );

	// get all user links on the page
	var userLinks = document.querySelectorAll ( 'a[href^="user?id="]' );

	var usersFound = [];
	forEach.call ( userLinks, function ( userLink ) {
		if ( usersToHighlight.indexOf ( userLink.innerHTML ) !== -1 ) {
			userLink.style.color = 'white';
			userLink.style.backgroundColor = highlightColour;
			userLink.className = 'HnFU-User';

			if ( usersFound.indexOf ( userLink.innerHTML ) === -1 ) {
				usersFound.push ( userLink.innerHTML );
			}
		}
	} );

	var foundUsersEl = document.createElement ( 'div' );
	foundUsersEl.id = 'HnFU-FoundUsers';

	if ( usersFound.length > 0 ) {
		var foundUsersTitleEl = document.createElement ( 'h1' );
		foundUsersTitleEl.innerHTML = 'Your favourite users:';
		foundUsersEl.appendChild ( foundUsersTitleEl );

		usersFound.forEach ( function ( userFound ) {
			var tmpEl = document.createElement ( 'a' );
			tmpEl.href = 'http://news.ycombinator.com/user?id=' + userFound;
			tmpEl.innerHTML = userFound;

			foundUsersEl.appendChild ( tmpEl );
		} );
	} else {
		var noUsersFoundEl = document.createElement ( 'div' );
		noUsersFoundEl.innerHTML = 'No favourite users found.<br /><a href="' + chrome.extension.getURL ( 'options.html' ) + '">Click here</a>, to add some users<br /> to your favourites list.';
		foundUsersEl.appendChild ( noUsersFoundEl );
	}

	document.body.appendChild ( foundUsersEl );
} );