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
		console.log ( 'a' );
		if ( usersToHighlight.indexOf ( userLink.innerHTML ) !== -1 ) {
			console.log ( userLink.href );
			userLink.style.color = 'white';
			userLink.style.backgroundColor = highlightColour;

			usersFound.push ( userLink.innerHTML );
		}
	} );

	var foundUsersEl = document.createElement ( 'div' );
	foundUsersEl.id = 'HnHU-FoundUsers';

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
		noUsersFoundEl.innerHTML = 'No favourite users found.<br /><a href="#">Click here</a>, to add some users to your favourites list.';
		foundUsersEl.appendChild ( noUsersFoundEl );
	}

	document.body.appendChild ( foundUsersEl );
} );