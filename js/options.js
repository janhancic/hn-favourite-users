function getUserHtml ( userName ) {
	return '<tr id="tr_' + userName + '"><td>' + userName + '</td><td><a href="http://news.ycombinator.com/user?id=' + userName + '" target="_blank">view profile</a></td><td><a href="#remove" class="icon-trash" data-username="' + userName + '"></a></td></tr>';
}

$( function () {
	var users = new Users ();
	var $usersList = $( '#UsersList' );
	var $txtNewUser = $( '#txtNewUser' );
	var $btnAddNewUser = $( '#btnAddNewUser' );
	var $errorMsg = $( '#ErrorMsg' );

	var html = '';
	users.getAll ().forEach ( function ( userName ) {
		html += getUserHtml ( userName );
	} );
	$usersList.append ( $( html ) );

	$usersList.on ( 'click', 'a.icon-trash', function () {
		var userNameToDelete = $( this ).data ( 'username' );

		users.remove ( userNameToDelete );

		$( '#tr_' + userNameToDelete ).remove ();

		return false;
	} );

	$( '#AddNewUserForm' ).submit ( function () {
		$errorMsg.hide ();
		$btnAddNewUser.attr ( 'disabled', true ).addClass ( 'loading disabled' );
		$txtNewUser.attr ( 'disabled', true );

		var userNameToAdd = $.trim ( $txtNewUser.val () );
		if ( userNameToAdd === '' ) {
			$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
			$txtNewUser.attr ( 'disabled', false );
			return false;
		}

		if ( users.exists ( userNameToAdd ) === true )  {
			$errorMsg.html ( 'user already on your list' ).show ();
			$btnAddNewUser.attr ( 'disabled', false ).removeClass ( 'loading disabled' );
			$txtNewUser.attr ( 'disabled', false );

			return false;
		}

		if ( users.isValid ( userNameToAdd ) === false ) {
			$errorMsg.html ( 'enter a valid HN username' ).show ();
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

		return false;
	} );
} );