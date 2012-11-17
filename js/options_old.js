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

function getUserHtml ( userName ) {
	return '<tr id="tr_' + userName + '"><td>' + userName + '</td><td><a href="http://news.ycombinator.com/user?id=' + userName + '" target="_blank">view profile</a></td><td><a href="#remove" class="icon-trash" data-username="' + userName + '"></a></td></tr>';
}

$( function () {
	var users = new Users ();
	var highlightColours = new HighlightColours ();
	var $usersList = $( '#UsersList' );
	var $txtNewUser = $( '#txtNewUser' );
	var $btnAddNewUser = $( '#btnAddNewUser' );
	var $errorMsg = $( '#ErrorMsg' );
	var $txtBackgroundColour = $( '#txtBackgroundColour' );
	var $txtColour = $( '#txtColour' );
	var $previewUser = $( '#PreviewUser' );
	var colourTest = /^([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;

	var updatePreview = function () {
		if ( colourTest.test ( $txtColour.val () ) === true ) {
			$previewUser.css ( 'color', '#' + $txtColour.val () );
		}

		if ( colourTest.test ( $txtBackgroundColour.val () ) === true ) {
			$previewUser.css ( 'backgroundColor', '#' + $txtBackgroundColour.val () );
		}
	};

	var html = '';
	users.getAll ().forEach ( function ( userName ) {
		html += getUserHtml ( userName );
	} );
	$usersList.append ( $( html ) );

	$txtBackgroundColour.val ( highlightColours.getBackgroundColour ().replace ( '#', '' ) );
	$txtColour.val ( highlightColours.getColour ().replace ( '#', '' ) );

	updatePreview ();

	$txtBackgroundColour.blur ( updatePreview );
	$txtColour.blur ( updatePreview );

	$usersList.on ( 'click', 'a.icon-trash', function () {
		var userNameToDelete = $( this ).data ( 'username' );

		users.remove ( userNameToDelete );

		$( '#tr_' + userNameToDelete ).remove ();

		return false;
	} );

	$( '#AddNewUserForm' ).submit ( function () {
		pageMessage.hide ();
		$btnAddNewUser.attr ( 'disabled', true ).addClass ( 'loading disabled' );
		$txtNewUser.attr ( 'disabled', true );

		var userNameToAdd = $.trim ( $txtNewUser.val () );
		if ( userNameToAdd === '' ) {
			$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
			$txtNewUser.attr ( 'disabled', false );
			return false;
		}

		if ( users.exists ( userNameToAdd ) === true )  {
			pageMessage.show ( 'error', 'user already on your list' );
			$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
			$txtNewUser.attr ( 'disabled', false );

			return false;
		}

		if ( users.isValid ( userNameToAdd ) === false ) {
			pageMessage.show ( 'error', 'enter a valid HN username' );
			$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
			$txtNewUser.attr ( 'disabled', false );

			return false;
		}

		users.add ( userNameToAdd );

		var $newUser = $( getUserHtml ( userNameToAdd ) );

		$usersList.append ( $newUser );

		$txtNewUser.val ( '' );
		$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
		$txtNewUser.attr ( 'disabled', false );

		pageMessage.show ( 'success', 'user added to your list' );

		return false;
	} );

	$( '#HighlightColourForm' ).submit ( function () {
		if ( colourTest.test ( $txtBackgroundColour.val () ) == false ) {
			pageMessage.show ( 'error', 'enter valid background colour' );
			return false;
		}

		if ( colourTest.test ( $txtColour.val () ) == false ) {
			pageMessage.show ( 'error', 'enter valid font colour' );
			return false;
		}

		highlightColours.setBackgroundColour ( '#' + $txtBackgroundColour.val () );
		highlightColours.setColour ( '#' + $txtColour.val () );

		pageMessage.show ( 'success', 'colours saved' );

		return false;
	} );

	$( '#ResetColoursLink' ).click ( function () {
		highlightColours.setBackgroundColour ( '#ff6600' );
		highlightColours.setColour ( '#ffffff' );

		$txtBackgroundColour.val ( 'ff6600' );
		$txtColour.val ( 'ffffff' );

		pageMessage.show ( 'success', 'colours reset to default values' );
		updatePreview ();

		return false;
	} );
} );