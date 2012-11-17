function HighlightColours () {
	this.namespace = 'v1';
}

HighlightColours.prototype.getBackgroundColour = function () {
	var colour = localStorage[this.namespace + '.backgroundColour'];

	if ( typeof colour === 'undefined' ) {
		return '#FF6600';
	}

	return colour;
};

HighlightColours.prototype.setBackgroundColour = function ( colour ) {
	localStorage[this.namespace + '.backgroundColour'] = colour.toUpperCase ();
};

HighlightColours.prototype.getColour = function () {
	var colour = localStorage[this.namespace + '.colour'];

	if ( typeof colour === 'undefined' ) {
		return '#FFFFFF';
	}

	return colour;
};

HighlightColours.prototype.setColour = function ( colour ) {
	localStorage[this.namespace + '.colour'] = colour.toUpperCase ();
};