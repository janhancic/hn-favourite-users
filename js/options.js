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

function HighlightColoursViewModel () {
	var self = this;
	self.highlightColoursModel = new HighlightColours ();
	self.backgroundColour = ko.observable ( self.highlightColoursModel.getBackgroundColour ().replace ( '#', '' ) );
	self.colour = ko.observable ( self.highlightColoursModel.getColour ().replace ( '#', '' ) );

	self.save = function () {
		var colourTest = /^([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;

		if ( colourTest.test ( self.backgroundColour () ) === false ) {
			pageMessage.show ( 'error', 'enter valid background colour' );
			return false;
		}

		if ( colourTest.test ( self.colour () ) === false ) {
			pageMessage.show ( 'error', 'enter valid font colour' );
			return false;
		}

		self.highlightColoursModel.setBackgroundColour ( '#' + self.backgroundColour() );
		self.highlightColoursModel.setColour ( '#' + self.colour() );

		pageMessage.show ( 'success', 'colours saved' );
	};

	self.reset = function () {
		self.highlightColoursModel.setBackgroundColour ( '#FF6600' );
		self.highlightColoursModel.setColour ( '#FFFFFF' );

		self.backgroundColour ( 'FF6600' );
		self.colour ( 'FFFFFF' );

		pageMessage.show ( 'success', 'colours reset to default values' );
	};
};

$( function () {
	ko.applyBindings ( new UsersViewModel (), document.getElementById ( 'Options' ) );
	ko.applyBindings ( new HighlightColoursViewModel (), document.getElementById ( 'HighlighColoursOptions' ) );
} );