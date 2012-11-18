// utils
var forEach = Array.prototype.forEach;

chrome.extension.sendRequest ( { method: 'getData' }, function ( extensionData ) {
	var usersToHighlight = extensionData.users;

	var highlightBackgroundColour = extensionData.highlightBackgroundColour;
	var highlightColour = extensionData.highlightColour;

	var foundUsersEl = document.createElement ( 'div' );
	foundUsersEl.id = 'HnFU-FoundUsers';

	if ( location.href.indexOf ( 'user?id=' ) !== -1 ) {
		var currentUser = location.href.substr ( location.href.indexOf ( 'user?id=' ) + 8 );

		var removeEl = document.createElement ( 'a' );
		removeEl.href = "#remove";
		removeEl.id = 'HnFU-AddRemoveLink';
		removeEl.innerHTML = '<img src="' + chrome.extension.getURL ( 'img/x.png' ) + '" /> remove from favourites';
		foundUsersEl.appendChild ( removeEl );

		var addEl = document.createElement ( 'a' );
		addEl.href = "#add";
		addEl.id = 'HnFU-AddRemoveLink';
		addEl.innerHTML = '<img src="' + chrome.extension.getURL ( 'img/heart.png' ) + '" /> add to favourites';
		foundUsersEl.appendChild ( addEl );

		removeEl.onclick = function () {
			chrome.extension.sendRequest ( { method: 'remove', userName: currentUser }, function () {
				addEl.style.display = 'block';
				removeEl.style.display = 'none';
			} );

			return false;
		};

		addEl.onclick = function () {
			chrome.extension.sendRequest ( { method: 'add', userName: currentUser }, function () {
				removeEl.style.display = 'block';
				addEl.style.display = 'none';
			} );

			return false;
		};

		if ( usersToHighlight.indexOf ( currentUser ) !== -1 ) {
			removeEl.style.display = 'block';
			addEl.style.display = 'none';
		} else {
			addEl.style.display = 'block';
			removeEl.style.display = 'none';
		}
	} else {
		// get all user links on the page
		var userLinks = document.querySelectorAll ( 'a[href^="user?id="]' );

		var usersFound = [];
		forEach.call ( userLinks, function ( userLink ) {
			if ( userLink.parentNode && userLink.parentNode.className === 'pagetop' ) {
				return;
			}

			if ( usersToHighlight.indexOf ( userLink.innerHTML ) !== -1 ) {
				userLink.style.color = highlightColour;
				userLink.style.backgroundColor = highlightBackgroundColour;
				userLink.className = 'HnFU-User';

				if ( usersFound.indexOf ( userLink.innerHTML ) === -1 ) {
					usersFound.push ( userLink.innerHTML );
				}
			}
		} );

		if ( usersFound.length > 0 ) {
			var foundUsersTitleEl = document.createElement ( 'h1' );
			foundUsersTitleEl.innerHTML = 'Favourite users on this page:';
			foundUsersEl.appendChild ( foundUsersTitleEl );

			usersFound.forEach ( function ( userFound ) {
				var tmpEl = document.createElement ( 'a' );
				tmpEl.href = 'http://news.ycombinator.com/user?id=' + userFound;
				tmpEl.innerHTML = userFound;

				foundUsersEl.appendChild ( tmpEl );
			} );
		} else {
			var noUsersFoundEl = document.createElement ( 'div' );
			noUsersFoundEl.innerHTML = 'No favourite users found.';
			foundUsersEl.appendChild ( noUsersFoundEl );
		}
	}

	var optionsContainerEl = document.createElement ( 'div' );
	optionsContainerEl.id = 'HnFU-OptionsLinkContainer';
	foundUsersEl.appendChild ( optionsContainerEl );

	var optionsLink = document.createElement ( 'a' );
	optionsLink.href = chrome.extension.getURL ( 'options.html' );
	optionsLink.title = 'HN Favourite Users - options';
	optionsLink.id = 'HnFU-OptionsLink';
	foundUsersEl.appendChild ( optionsLink );

	document.body.appendChild ( foundUsersEl );
} );