document.addEventListener('DOMContentLoaded', function() {      
    var season_stats = document.getElementById('season_stats');
    var clicked = false;

    season_stats.addEventListener('click',function () {

    var theUrl = "http://cors.io/?u=http://fantasy.premierleague.com/entry/1269372/history/";

      if (localStorage.getItem("team_current_name") === null) {
      team_current_name = '';
      }
      else
      {
        team_current_name = JSON.parse(localStorage['team_current_name']);
      }        



    if(clicked == false)
    {
        load_teams();
        load(theUrl,team_current_name);
    }


})

    var fetch = document.getElementById("fetch");
    fetch.addEventListener('click',function () {

    var team_select = document.getElementById("team_select");
    var team = team_select.options[team_select.selectedIndex].value;
    var team_current_name = team;
    if (localStorage.getItem("teams") === null) {
        teams = {};
    }
    else
    {
        teams = JSON.parse(localStorage['teams']);
        team = teams[team];
    }        
    var theUrl = "http://fantasy.premierleague.com/entry/"+team+"/history/";

    load(theUrl,team_current_name);

})


    function load(theUrl,team_current_name)
    {
            var data_points = {
        labels: [],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [],
                title:"Gameweek Points"
            }
        ]
    };


    var data_gwrank = {
        labels: [],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: []
            }
        ]
    };

    var data_orank = {
        labels: [],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: []
            }
        ]
    };

    var options_points = {

        annotateDisplay:true,
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        dynamicDisplay : true,
            //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,
        
        //Minimum y-axis
        yAxisMinimumInterval:1

    };


    var options_gwrank = {

        legend:true,
        annotateDisplay:true,
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,
        
        //Minimum y-axis
        yAxisMinimumInterval:100000,
        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    var options_orank = {

        legend:true,

        annotateDisplay:true,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,
        
        //Minimum y-axis
        yAxisMinimumInterval:1000000,

        tooltipTemplate:"<%=label%>: <%=value%>g",
        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };


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
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var gameweek = JSON.parse(localStorage['gameweek']);
                var response = xmlhttp.responseText;
                var classname = 'ismElementText ismPitchWebName JS_ISM_NAME';
                var classpoint = 'ismTooltip'; 
                var classtable = 'ismTable';
                var class_points = 'ismCol2';
                var class_gwrank = 'ismCol4';
                var class_orank = 'ismCol9';
                var id = "ismDataElements";
                parser = new DOMParser();
                doc = parser.parseFromString(response, "text/html");
                var points = doc.body.getElementsByClassName(class_points);            
                var gwrank = doc.body.getElementsByClassName(class_gwrank);
                var orank = doc.body.getElementsByClassName(class_orank);
//                console.log(temp);
                for(var i=1;i<=gameweek;i++)
                {

                  data_points.datasets[0].data[i-1] = points[i+1].innerHTML;
                  var text = gwrank[i+1].innerHTML;
                  text = text.replace(',','');
                  text = text.replace(',','');
                  data_gwrank.datasets[0].data[i-1] = text;
                  var text = orank[i+1].innerHTML;
                  text = text.replace(',','');
                  text = text.replace(',','');
                  data_orank.datasets[0].data[i-1] = text;
                  data_points.labels[i-1] = "GW "+i;
                  data_gwrank.labels[i-1] = "GW "+i;
                  data_orank.labels[i-1] = "GW "+i;
                  data_points.datasets[0].title = "Gameweek Points";
                  data_gwrank.datasets[0].title = "Gameweek Rank";
                  data_orank.datasets[0].title = "Overall Rank";
            
                }
            var ctx = document.getElementById("chart_points").getContext("2d");
            var myLineChart = new Chart(ctx).Line(data_points,options_points);
            var ctx = document.getElementById("chart_gwrank").getContext("2d");
            var myLineChart = new Chart(ctx).Line(data_gwrank,options_gwrank);
            var ctx = document.getElementById("chart_orank").getContext("2d");
            var myLineChart = new Chart(ctx).Line(data_orank,options_orank);
            clicked = true;
            var desc = document.getElementById('description_gameweek');
            desc.innerHTML = "Team Name: "+team_current_name;

            }
        }
        xmlhttp.open("GET", theUrl, false );
        try{
            xmlhttp.send();    
        }
        catch(e) {
            document.getElementById('charts1').setAttribute('style',"visibility:hidden;display:none");

            alert("An error occured. Check your internet connection or check your team ID or maybe FPL server is busy. Just give a try after some time.")
        }


    }

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
          x.add(option, x[x.length]);
     }
    }

    }

})