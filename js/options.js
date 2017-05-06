document.addEventListener('DOMContentLoaded', function() {  	

	load();

  var add_team = document.getElementById('add_team');
  var table = document.getElementById('table');
  var help = document.getElementById('help');

  help.addEventListener('click',function () {  	

    chrome.tabs.create({url:chrome.extension.getURL('help.html')});

  })

  add_team.addEventListener('click',function () {  	

	var row=table.insertRow(table.rows.length);
	var index=table.rows.length;
    var cell1=row.insertCell(0);
    var t1=document.createElement("input");
    	t1.setAttribute('placeholder','Enter Team Name');
        t1.id = "txtName"+index;
        cell1.appendChild(t1);
    var cell2=row.insertCell(1);
    var t2=document.createElement("input");
    	t2.setAttribute('placeholder','Enter Team ID');
        t2.id = "txtAge"+index;
        cell2.appendChild(t2);
    var cell3=row.insertCell(2);
    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-ok glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.setAttribute('style','margin-right:5%;')
    	button.id = "confirm";
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {

    		add(t1.id,t2.id);
  })
    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-remove glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.id = 'cancel';
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {

    		table.deleteRow(index-1);
  })
    // body...
  })

	function add(id1, id2)
	{
		var team_name = document.getElementById(id1).value
		var team_id =  document.getElementById(id2).value;
		var teams = {};
		if (localStorage.getItem("teams") === null) {
		  //...
		  teams = {};
		}
		else
		{
    		teams = JSON.parse(localStorage['teams']);				
		}
		teams[team_name] = team_id ;
		localStorage['teams'] = JSON.stringify(teams);
		location.reload();

	}

	function addEdit(id1, id2,text)
	{
		var team_delete = text;	
		var teams;
		if (localStorage.getItem("teams") === null) {
		  //...
		  teams = {};
		}
		else
		{
    		teams = JSON.parse(localStorage['teams']);
    		delete teams[team_delete];
    		localStorage["teams"] = JSON.stringify(teams);
    	}

		var team_name = document.getElementById(id1).value
		var team_id =  document.getElementById(id2).value;
		if (localStorage.getItem("teams") === null) {
		  //...
		  teams = {};
		}
		else
		{
    		teams = JSON.parse(localStorage['teams']);				
		}
		teams[team_name] = team_id ;
		localStorage['teams'] = JSON.stringify(teams);
		location.reload();
/*		document.getElementById(id1).setAttribute('disabled','disabled');
		document.getElementById(id2).setAttribute('disabled','disabled');
*/

	}

	function load () {
//		console.log("Loading");
		var teams = {};
		var table = document.getElementById('table');
//    		document.getElementById('heading').innerHTML = team_name;
	if (localStorage.getItem("teams") === null) {
	  //...
	  teams = {};
	}
	else
	{
		teams = JSON.parse(localStorage['teams']);
	    var team_names = Object.keys(teams);
	    for(var i=0;i<team_names.length;i++)
	    {
			var row=table.insertRow(table.rows.length);				
			var index = table.rows.length-1;
		    var cell1=row.insertCell(0);
		    cell1.innerHTML = team_names[i];
		    var cell2=row.insertCell(1);
		    cell2.innerHTML = teams[cell1.innerHTML];
		    var cell3 = row.insertCell(2);
		    var button = document.createElement("button")
		    var span = document.createElement("span");
	    	span.setAttribute('class','glyphicon-pencil glyphicon');
	    	button.appendChild(span);
	    	button.setAttribute('class', ' btn-primary btn');
	    	button.setAttribute('style','margin-right:5%;')
	    	button.id = "edit"+index;
	    	cell3.appendChild(button);
    	button.addEventListener('click',function () {

		edit(this.id);
})
		    var button = document.createElement("button")
		    var span = document.createElement("span");
	    	span.setAttribute('class','glyphicon-remove glyphicon');
	    	button.appendChild(span);
	    	button.setAttribute('class', ' btn-primary btn');
	    	button.id = 'cancel'+index;
	    	cell3.appendChild(button);
	button.addEventListener('click',function () {

		remove(this.id);
})

	    }
	}
	}

	function removeEdit(index,team_name,team_id){
		var table = document.getElementById('table');
		var id =index;
		var row=table.rows[id];
    	var cell1=row.cells[0];
        cell1.innerHTML = team_name;
	    var cell2=row.cells[1];
        cell2.innerHTML = team_id;
        row.deleteCell(2);
        var cell3 = row.insertCell(2);
	    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-pencil glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.setAttribute('style','margin-right:5%;')
    	button.id = "edit"+id;
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {
    		edit(this.id);
  })
    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-remove glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.id = 'cancel'+index;
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {
//    		remove(this.id);
  })
	}

	function remove(index){

		var table = document.getElementById('table');
		var id = index.substr(6,index.length-6);
		var team_name = table.rows[id].cells[0].innerHTML;
		var team_id = table.rows[id].cells[1].innerHTML;
		table.deleteRow(id);
		if (localStorage.getItem("teams") === null) {
		  teams = {};
		}
		else
		{
    		teams = JSON.parse(localStorage['teams']);
    		delete teams[team_name];
    		localStorage["teams"] = JSON.stringify(teams);
    	}
	}

	function edit (index) {
		var table = document.getElementById('table');
		var id = index.substr(4,index.length-4);
		var team_name = table.rows[id].cells[0].innerHTML;
		var team_id = table.rows[id].cells[1].innerHTML;
		var row=table.rows[id];
		var index=table.rows.length;
    	var cell1=row.cells[0];
    	var t1=document.createElement("input");
    	t1.value = cell1.innerHTML;
        t1.id = "txtName"+id;
        cell1.innerHTML = '';
        cell1.appendChild(t1);
	    var cell2=row.cells[1];
	    var t2=document.createElement("input");
    	t2.value = cell2.innerHTML;
        t2.id = "txtAge"+id;
        cell2.innerHTML = '';
        cell2.appendChild(t2);
        row.deleteCell(2);
        var cell3 = row.insertCell(2);
	    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-ok glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.setAttribute('style','margin-right:5%;')
    	button.id = "editConfirm";
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {
    		addEdit(t1.id,t2.id,team_name);
  })
    var button = document.createElement("button")
	    var span = document.createElement("span");
    	span.setAttribute('class','glyphicon-remove glyphicon');
    	button.appendChild(span);
    	button.setAttribute('class', ' btn-primary btn');
    	button.id = 'editCancel';
    	cell3.appendChild(button);
    	button.addEventListener('click',function () {
    		removeEdit(id,team_name,team_id);
  })
		// body...
	}


})