  document.addEventListener('DOMContentLoaded', function() {

    load_teams();
    load_gameweek();

 chrome.runtime.onInstalled.addListener(function (object) {
        chrome.tabs.create({url:chrome.extension.getURL('options.html')});
  });

 
    var checkPageButton = document.getElementById('grab');
    var options = document.getElementById('options');

    options.addEventListener('click',function () {
      chrome.tabs.create({url:chrome.extension.getURL('options.html')});
    })

    moreStats.addEventListener('click',function () {
      chrome.tabs.create({url:chrome.extension.getURL('stats.html')});
    })

    checkPageButton.addEventListener('click', function() {

      chrome.tabs.getSelected(null, function(tab) {

        document.getElementById('data').setAttribute('style','"visibility:hidden;display:none"');
        document.getElementById('error').setAttribute('style','"visibility:hidden;display:none"');

        var team_select = document.getElementById("team_select");
        var gameweek_select = document.getElementById('gameweek_select');
        var team_input = document.getElementById('team_input');
        var gameweek = gameweek_select.options[gameweek_select.selectedIndex].value.substr(9,2);
        if(team_input.value=="")
        {
          var team = team_select.options[team_select.selectedIndex].value;
          localStorage['team_current_name'] = JSON.stringify(team);
          var teams;
          if (localStorage.getItem("teams") === null) {
          teams = {};
          }
          else
          {
            teams = JSON.parse(localStorage['teams']);
            team = teams[team];
          }        
        }
        else
        {
          team = team_input.value;
          localStorage['team_current_name'] = JSON.stringify(team);
        }
        var total_score = 0;
        theUrl = "http://fantasy.premierleague.com/entry/"+team+"/event-history/"+gameweek+"/";
        localStorage['team_current_id'] = JSON.stringify(team);
        var table = document.getElementById("table");

              if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
              }
              else
              {// code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
              xmlhttp.onreadystatechange=function()
              {
//                console.log(xmlhttp.status);
                  if (xmlhttp.readyState==4 && xmlhttp.status==200)
                  {
                    try{

                      var response = xmlhttp.responseText;
                      var classname = 'ismElementText ismPitchWebName JS_ISM_NAME';
                      var classpoint = 'ismTooltip'; 
                      var classAvgPoint = 'ism-scoreboard-panel--secondary__value';
                      var classHighestPoint = 'ism-scoreboard-panel--secondary__value';
                      var id = "ismDataElements";
                      parser = new DOMParser();
                      doc = parser.parseFromString(response, "text/html");
                      var temp = doc.body.getElementsByClassName(classname);
                      var temp1 = doc.body.getElementsByClassName(classpoint);
                      var avg_point = doc.body.getElementsByClassName(classAvgPoint)[0];
                      var high_point = doc.body.getElementsByClassName(classHighestPoint)[1];
                      var t = doc.getElementById(id).getAttribute('data-picks');
                      var x = doc.body.getElementsByClassName('ismDefList ismRHSDefList')[0];
                      var y = x.getElementsByTagName('dd');
                      var z = doc.body.getElementsByClassName('ismDefList ismSBDefList ism-scoreboard__def-list')[0];
                      var a = z.getElementsByTagName('dd');
                      var gameweek_rank = a[0].innerHTML ;
                      var parsed_array = JSON.parse(t);
                      var players = [];
                      var points = [];
                      var minutes_played = [];
                      var assists = [] , clean_sheets = [], goals_scored = [], goals_conceded = [], yellow_card = [], red_card = [], bonus = [];
                      total_score=0;
                      for(var i = 0; i<temp.length;i++)
                      {
                        players[i] = temp[i].innerHTML;
                        points[i] = temp1[i].innerHTML;
                        minutes_played[i] = parsed_array[i].stats[2];
                        goals_scored[i]  = parsed_array[i].stats[3];
                        assists[i]  = parsed_array[i].stats[4];
                        clean_sheets[i]  = parsed_array[i].stats[5];
                        goals_conceded[i]  = parsed_array[i].stats[6];
                        yellow_card[i]  = parsed_array[i].stats[10];
                        red_card[i]  = parsed_array[i].stats[11];
                        bonus[i]  = parsed_array[i].stats[13];
                        var temp_score = parseInt( temp1[i].innerHTML);
                        if(isNaN(temp_score))
                        {
                          temp_score = 0;
                        }
                        total_score += temp_score;
                      }
                        document.getElementById('error').setAttribute('style','"visibility:hidden;display:none"');
                        document.getElementById('data').setAttribute('style','"visibility:visible;display:block"');
                        rows = document.getElementById('table').rows;
                        var row = rows[0];
                          document.getElementById('more').setAttribute('style','visibility:visible;display:block');
                          row.cells[1].innerHTML = total_score;
                        var row = rows[1];
                        row.cells[1].innerHTML = gameweek_rank;
                        localStorage['overall_points'] = JSON.stringify(y[0].innerHTML);
                        localStorage['overall_rank']= JSON.stringify(y[1].innerHTML);
                        localStorage['total_players'] = JSON.stringify(y[2].innerHTML);
                        localStorage['gameweek_rank'] = JSON.stringify(gameweek_rank);              
                        localStorage['gameweek'] = JSON.stringify(gameweek);
                        localStorage["players"] = JSON.stringify(players);                  
                        localStorage["points"] = JSON.stringify(points);
                        localStorage["minutes_played"] = JSON.stringify(minutes_played);
                        localStorage["goals_scored"] = JSON.stringify(goals_scored);
                        localStorage["goals_conceded"] = JSON.stringify(goals_conceded);
                        localStorage["assists"] = JSON.stringify(assists);
                        localStorage["clean_sheets"] = JSON.stringify(clean_sheets);
                        localStorage["yellow_card"] = JSON.stringify(yellow_card);
                        localStorage["red_card"] = JSON.stringify(red_card);
                        localStorage["bonus"] = JSON.stringify(bonus);
                        localStorage["total_score"] =JSON.stringify(total_score);
                        if(avg_point===undefined)
                          localStorage["avg_point"] =JSON.stringify("-");
                        else
                          localStorage["avg_point"] =JSON.stringify(avg_point.innerHTML);
                        if(high_point===undefined)
                          localStorage["highest_point"] = JSON.stringify('-');
                        else
                          localStorage["highest_point"] = JSON.stringify(high_point.innerHTML);
                        document.getElementById('error').setAttribute('style','"visibility:hidden;display:none"');
                    }
                    catch(e)
                    {
//                      console.log('hey');
                    }
                  }
                  else
                  {
                    if (xmlhttp.readyState==4 && xmlhttp.status==500)
                    {
                          document.getElementById('more').innerHTML = 'An error occured. Please try again later.';
                          document.getElementById('data').setAttribute('style','"visibility:hidden;display:none"');
                          document.getElementById('data').innerHTML = "An error occured. Check your internet connection or check your team ID or maybe FPL server is busy. Just give a try after some time.";
                    }
                  }
              }
              xmlhttp.open("GET", theUrl, false );
              try{
                xmlhttp.send();                    
              }
              catch(e)
              {
                  document.getElementById('more').innerHTML = 'An error occured. Please try again later.';
                  document.getElementById('data').setAttribute('style','"visibility:hidden;display:none"');
                  document.getElementById('data').innerHTML = "An error occured. Check your internet connection or check your team ID or maybe FPL server is busy. Just give a try after some time.";                
              }
      });
         

    }, false);


    function load_teams(){
      var x = document.getElementById("team_select");
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
          var option = document.createElement("option");
          option.text = team_names[i];
          x.add(option, x[0]);
     }
    }

    }

    function load_gameweek() {

        var gameweek_array = [" 19 Dec 14:00 GMT 2015 " , " 26 Dec 11:45 GMT 2015 " , " 28 Dec 14:00 GMT 2015 " , " 02 Jan 11:45 GMT 2016 " , " 12 Jan 18:45 GMT 2016 " , " 16 Jan 11:45 GMT 2016 " , " 23 Jan 11:45 GMT 2016 " , " 02 Feb 18:45 GMT 2016 " , " 06 Feb 11:45 GMT 2016 " , " 13 Feb 11:45 GMT 2016 " , " 27 Feb 11:45 GMT 2016 " , " 01 Mar 18:45 GMT 2016 " , " 05 Mar 14:00 GMT 2016 " , " 12 Mar 14:00 GMT 2016 " , " 19 Mar 14:00 GMT 2016 " , " 02 Apr 14:00 GMT 2016 " , " 09 Apr 14:00 GMT 2016 " , " 16 Apr 14:00 GMT 2016 " , " 23 Apr 14:00 GMT 2016 " , " 30 Apr 14:00 GMT 2016", " 07 May 11:45 GMT 2016 ", " 15 May 14:00 GMT 2016 "];
        var current_date = new Date();
        var current = 0;
        for(var i=0;i<gameweek_array.length;i++)
        {
          var date = new Date(gameweek_array[i]);
          if(current_date<date)
          {
            current = i;
            break;
          }
        }
        current += 17;
        current -= 1;
        if(i==gameweek_array.length)
        {
          current=38;
        }
        for(var i=1;i<=current;i++)
        {
            var gameweek_select = document.getElementById('gameweek_select');
            var option = document.createElement("option");
            option.text = "Gameweek "+i;
            gameweek_select.add(option, gameweek_select[0]);
        }

    }

    google_analytics();

    function google_analytics()
    {
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here
       
      ga('create', 'UA-71651154-1', 'auto');
      ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
      ga('require', 'displayfeatures');
      ga('send', 'pageview', '/popup.html');

    }



  }, false);