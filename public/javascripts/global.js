// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =================================
$(document).ready(function(){
	
	// Populate the user table on initial page load
	populateTable();

	// Username Link Click
	$('#userList table tbody').on('click','td a.linkshowuser', showUserInfo);

});

// Functions =================================

// Fill table with data
var populateTable = function (){
	// Empty content string
	var tableContent = new String;

	// jQuery AJAX call for JSON
	$.getJSON('/users/userlist', function(data){

		userListData = data;
	
		// For each item in our JSON, add a table row 
		// and cells to the content string
    $.each(data, function(){
          tableContent += '<tr>';
          tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
          tableContent += '<td>' + this.email + '</td>';
          tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
          tableContent += '</tr>';
      });

		// Inject the whole content string into existing HTML table
		$('#userList table tbody').html(tableContent);
	});
}

// Show User info
var showUserInfo = function(event){
	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');

	// Get index of object based on id value
	var arrayPosition = userListData.map(function(arrayItem){ return arrayItem.username; }).indexOf(thisUserName);

	// Get User Object
	var thisUserObject = userListData[arrayPosition];

	// Populate Info Box
	$('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
}

