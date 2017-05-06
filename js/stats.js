document.addEventListener('DOMContentLoaded', function() {
  
  var rows=  document.getElementById('table').rows;
  var players = JSON.parse(localStorage["players"]);
  var points = JSON.parse(localStorage["points"]);
  var minutes_played = JSON.parse(localStorage["minutes_played"]);
  var goals_scored = JSON.parse(localStorage["goals_scored"]);
  var goals_conceded = JSON.parse(localStorage["goals_conceded"]);
  var assists = JSON.parse(localStorage["assists"]);
  var clean_sheets = JSON.parse(localStorage["clean_sheets"]);
  var yellow_card = JSON.parse(localStorage["yellow_card"]);
  var red_card = JSON.parse(localStorage["red_card"]);
  var bonus = JSON.parse(localStorage["bonus"]); 
  var total_score= JSON.parse(localStorage["total_score"]);
      if (localStorage.getItem("team_current_name") === null) {
    team_current_name = '';
    }
    else
    {
      team_current_name = JSON.parse(localStorage['team_current_name']);
    }        


  if (localStorage.getItem("highest_point") === null) {
      //...
      var high_point = '-' ;
    }
    else
    {
      var high_point = JSON.parse(localStorage["highest_point"]);
    }
    if (localStorage.getItem("avg_point") === null) {
      //...
      var avg_point = '-' ;
    }
    else
    {
      var avg_point = JSON.parse(localStorage["avg_point"]);
    }
    if (localStorage.getItem("overall_points") === null) {
      //...
      var overall_points = '-' ;
    }
    else
    {
      var overall_points = JSON.parse(localStorage["overall_points"]);
    }
    if (localStorage.getItem("total_players") === null) {
      //...
      var total_players = '-' ;
    }
    else
    {
      var total_players = JSON.parse(localStorage['total_players']);
    }
    if (localStorage.getItem("overall_rank") === null) {
      //...
      var overall_rank = '-' ;
    }
    else
    {
      var overall_rank = JSON.parse(localStorage['overall_rank']);
    }
  var gameweek = JSON.parse(localStorage['gameweek']);

  for(var i = 0; i<players.length;i++)
  {
    var col = 0;
    var row = rows[i+1];
    row.cells[col++].innerHTML = players[i];
    row.cells[col++].innerHTML = points[i];
    row.cells[col++].innerHTML = minutes_played[i];
    row.cells[col++].innerHTML = goals_scored[i];
    row.cells[col++].innerHTML = assists[i];
    row.cells[col++].innerHTML = clean_sheets[i];
    row.cells[col++].innerHTML = goals_conceded[i];
    row.cells[col++].innerHTML = yellow_card[i];
    row.cells[col++].innerHTML = red_card[i];
    row.cells[col++].innerHTML = bonus[i];
  }
    rows = document.getElementById('table_point').rows;
    var row = rows[0];
    row.cells[1].innerHTML = total_score;
    var row = rows[1];
    if(avg_point!='-')
    row.cells[1].innerHTML = avg_point.substr(0,avg_point.length-14);
    else
    row.cells[1].innerHTML = avg_point;
    var row = rows[2];
    if(high_point!='-')
    row.cells[1].innerHTML = high_point.substr(0,high_point.length-14);
    else
    row.cells[1].innerHTML = high_point;


    rows = document.getElementById('table_overall').rows;
    var row = rows[0];
    row.cells[1].innerHTML = overall_points;
    var row = rows[1];
    row.cells[1].innerHTML = overall_rank;
    var row = rows[2];
    row.cells[1].innerHTML = total_players;

    var desc = document.getElementById('description');
    desc.innerHTML = "Gameweek "+gameweek+" Stats";

    var desc = document.getElementById('description_gameweek_1');
    desc.innerHTML = "Team Name: "+team_current_name;

})