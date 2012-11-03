// utils
var forEach = Array.prototype.forEach;

// tmp static users list
var usersToHighlight = [
	'pg',
	'CWIZO',
	'6ren',
	'rishi'
];

// get all user links on the page
var userLinks = document.querySelectorAll ( 'a[href^="user?id="]' );

var usersFound = [];
forEach.call ( userLinks, function ( userLink ) {
	if ( usersToHighlight.indexOf ( userLink.innerHTML ) !== -1 ) {
		console.log ( userLink.href );
		userLink.style.color = 'white';
		userLink.style.backgroundColor = '#ff6600';

		usersFound.push ( userLink.innerHTML );
	}
} );

console.log ( usersFound );