/* 
Eddy Davila
ASDI
Full Sail University
Mobile Development
Week 3
*/
$(document).on("pageinit", "home", function(){
	$.couch.db("arthouse").view("app/programs", {
		success: function(data) {
			console.log(data);
		}
	});
});


$(document).ready(function(){
	console.log("Let's do this!");
		$.ajax({
		"url": '/arthouse/_all_docs?include_docs=true&start_key="program:"&end_key="program:zzzzz"',
		"dataType": "json",
		"success": function(data) {
			console.log(data);
				$.each(data.rows, function(index, program) {
					console.log(program);
					var acronym = program.doc.acronym;
					var title = program.doc.title;
					var months = program.doc.months;
					$("#programlist").append(
						$('<li>').append(
							$("<a>").attr("href", "#")
								.text(title)
						)
					);
			    });
			    $("#programlist").listview("refresh");
		  }
	 });
});


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	

$('#members').on('pageinit', function(){
	getData(data);
});	

$('#addItem').on('pageinit', function(){
delete $.validator.methods.date;
	var myForm = $('#formAddMember');
    myForm.validate({
		invalidHandler: function(form, validator) {
	},
	submitHandler: function() {
		var data = myForm.serializeArray();
		storeData(this.key);
	}
});

	//any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function getX(parameter){
		var theElement = document.getElementById(parameter);
		return theElement;
};

var autoFillData = function(){
	for(var n in json){
		var id = Math.floor(Math.random()*1010101010);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getData = function(data){
	var getImage = function(imageName, makeDataSubList){
		var imageLi = document.createElement("li");
		makeDataSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "images/" + imageName + ".jpg");
		imageLi.appendChild(newImage);
	}
	var makeDataDiv = getX("data");
	var makeDataList = document.createElement("ul");
	makeDataList.setAttribute("data-role", "list-view");
	makeDataList.setAttribute("data-filter", "true");
	makeDataDiv.appendChild(makeDataList);	
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeDataLi = document.createElement("li");
		var linksLi = document.createElement("li");
		makeDataList.appendChild(makeDataLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeDataSubList = document.createElement("ul");
		makeDataLi.appendChild(makeDataSubList);
		getImage(obj.league[1], makeDataSubList);
		for (var n in obj){
			var makeSubLi = document.createElement("li");
			makeDataSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubLi.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}

};							

var makeItemLinks = function(key, makeDataSubList){
	var editLink = document.createElement("a");
	editLink.setAttribute("data-role", "button");
	editLink.href = "#addItem";
	editLink.key = key;
	var editText = "Edit Member";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	makeDataSubList.appendChild(editLink);

	var deleteLink = document.createElement("a");
	deleteLink.setAttribute("data-role", "button");
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Member";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	makeDataSubList.appendChild(deleteLink);
};

var storeData = function(key){
	if(key == undefined || key == "null"){
		var key = Math.floor(Math.random()*1010101010);
	}
		var id = key;
		var item 			= {};
			item.fName 		= ["First Name:", $("#fName").val()];
			item.lName 		= ["Last Name:", $("#lName").val()];
			item.eMail 		= ["Email:", $("#eMail").val()];
			item.skill		= ["Skill:", $("#skill").val()];
			item.notes		= ["Notes:", $("#notes").val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Member Added! Key: " + key);


	viewLink();
	return key;
}; 

var	deleteItem = function(){
	var ask = confirm("Delete this member?")
	if (ask){
		localStorage.removeItem(this.key);
		alert("Member was deleted.")
	}else{
		alert("Member was NOT deleted.")
	}
	viewLink();				
};


var editItem = function(){

	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	console.log(item);
	$("#fName").val(item.fName[1]);
	$("#lName").val(item.lName[1]);
	$("#eMail").val(item.eMail[1]);
	$("#skill").val(item.skill[1]);
	$('#addItem').page();
	$('#skill').val(item.skill[1]);
	$('#skill').slider('refresh');
	$("#notes").val = item.notes[1];


	saveButton.removeEventListener("click");
	var editSubmit = getX("submit");
	editSubmit.addEventListener("click");
	editSubmit.key = this.key;
	$("#submit").value = "Save Changes";
	$("#submit").button('refresh');

	localStorage.removeItem(this.key);
};

var clearLocal = function(){
	if (localStorage.length === 0){
		alert("There is no data to delete!")
	}else{
		var askDelete = confirm("Delete from LocalStorage?");
		if(askDelete){
			localStorage.clear();
			alert("Local Storage Data has been deleted.")
			window.location.reload();
		}
		return false;
	}
};

var viewLink = function(){
	var	link = $('#viewLink');
	link.click();
	window.location.reload();

};

var popJSON = function(){
	if(localStorage.length === 0){
		var askAutoFill = confirm("There is no data to display! Add data from JSON?");
		if(askAutoFill === true){
			autoFillData();	
		}
	}
};

var displayLink = getX("displayLink");
displayLink.addEventListener("click", popJSON);

var clearLink = getX("clearLink");
clearLink.addEventListener("click", clearLocal);

var saveButton = getX("submit");
saveButton.addEventListener("click");