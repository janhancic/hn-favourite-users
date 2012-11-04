function Users () {
	this.namespace = 'v1';
}

Users.prototype.exists = function ( userName ) {
	if ( localStorage.getObject ( this.namespace + '.users' ) === null ) {
		return false;
	}

	if ( localStorage.getObject ( this.namespace + '.users' ).indexOf ( userName ) === -1  ) {
		return false;
	} else {
		return true;
	}
};

Users.prototype.isValid = function ( userName ) {
	var isValid = true;
	/*$.ajax ( {
		async: false,
		url: 'http://news.ycombinator.com/user?id=' + userName,
		callback: function ( response ) {

		}
	} );*/

	return isValid
};

Users.prototype.add = function ( userName ) {
	if ( this.exists ( userName ) === true ) {
		return;
	}

	var users = this.getAll ();
	users.push ( userName );

	localStorage.setObject ( this.namespace + '.users', users );
};

Users.prototype.remove = function ( userName ) {
	var users = localStorage.getObject ( this.namespace + '.users' );

	users.splice ( users.indexOf ( userName ), 1 );

	localStorage.setObject ( this.namespace + '.users', users );
};

Users.prototype.getAll = function () {
	var users = localStorage.getObject ( this.namespace + '.users' );

	if ( users === null ) {
		users = [];
	}

	return users;
};