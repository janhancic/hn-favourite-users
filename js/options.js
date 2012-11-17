var pageMessage = (function () {
	var $message = $( '#PageMessage' );
	var fadeOutTimer = null;

	return {
		show: function ( type, message ) {
			$message.removeClass ( 'alert-error' );
			$message.removeClass ( 'alert-success' );

			if ( type === 'error' ) {
				$message.addClass ( 'alert-error' );
			} else {
				$message.addClass ( 'alert-success' );
			}

			$message.html ( message );
			$message.show ();

			fadeOutTimer = setTimeout (
				function () {
					$message.fadeOut ();
				},
				5000
			);
		},
		hide: function () {
			clearTimeout ( fadeOutTimer );
			$message.hide ();
		}
	};
} () );

function UsersViewModel () {
	var self = this;
	self.usersModel = new Users ();
	self.users = ko.observableArray ( self.usersModel.getAll () );
	self.newUserName = ko.observable ();
	self.isAdding = ko.observable ( false );

	self.add = function () {
		pageMessage.hide ();
		self.isAdding ( true );

		var userNameToAdd = $.trim ( self.newUserName () );
		if ( userNameToAdd === '' ) {
			self.isAdding ( false );
			return false;
		}

		if ( self.usersModel.exists ( userNameToAdd ) === true )  {
			pageMessage.show ( 'error', 'user already on your list' );
			self.isAdding ( false );
			return false;
		}

		if ( self.usersModel.isValid ( userNameToAdd ) === false ) {
			pageMessage.show ( 'error', 'enter a valid HN username' );
			self.isAdding ( false );
			return false;
		}

		self.usersModel.add ( userNameToAdd );
		self.users.push ( userNameToAdd );

		self.newUserName ( '' );
		self.isAdding ( false );

		pageMessage.show ( 'success', 'user added to your list' );
	};

	self.remove = function ( userName ) {
		self.usersModel.remove ( userName );
		self.users.remove ( userName );

		pageMessage.show ( 'success', 'user removed from your list' );
	};
};

$( function () {
	var highlightColours = new HighlightColours ();

	ko.applyBindings ( new UsersViewModel (), document.getElementById ( 'Options' ) );
} );