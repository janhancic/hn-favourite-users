function HighlightColours () {
	this.namespace = 'v1';
}

HighlightColours.prototype.add = function ( userName ) {
	if ( this.exists ( userName ) === true ) {
		return;
	}

	var users = this.getAll ();
	users.push ( userName );

	localStorage.setObject ( this.namespace + '.users', users );
};

HighlightColours.prototype.getBackgroundColour = function () {
	var colour = localStorage[this.namespace + '.backgroundColour'];

	if ( typeof colour === 'undefined' ) {
		return '#ff6600';
	}

	return colour;
};

HighlightColours.prototype.setBackgroundColour = function ( colour ) {
	localStorage[this.namespace + '.backgroundColour'] = colour;
};

HighlightColours.prototype.getColour = function () {
	var colour = localStorage[this.namespace + '.colour'];

	if ( typeof colour === 'undefined' ) {
		return '#ffffff';
	}

	return colour;
};

HighlightColours.prototype.setColour = function ( colour ) {
	localStorage[this.namespace + '.colour'] = colour;
};