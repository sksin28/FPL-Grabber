document.addEventListener('DOMContentLoaded', function() {      
    var season_stats = document.getElementById('season_stats');

    load_teams();

    compare_stats.addEventListener('click',function () {


})
/*        $('#team_select_1').change(function(event) {
        if ($(this).val().length > 4) {
          alert('You can only choose 5!');
          $(this).val(last_valid_selection);
        } else {
          last_valid_selection = $(this).val();
        }
        if ($(this).val().length < 2) {
          alert('You must choose 2!');
          $(this).val(last_valid_selection);
        } else {
          last_valid_selection = $(this).val();
        }

      });
*/
  compare.addEventListener('click',function () {

    var team_select_1 = document.getElementById("team_select_1");
    var opts = getSelectedOptions(team_select_1);
    var check = true;
        if ($(team_select_1).val().length > 4) {
            check = false;
          alert('You can only choose 5!');
        }
        if ($(team_select_1).val().length < 2) {
            check=false;
          alert('You must choose 2!');
        }

    if(check == false)
    {
        document.getElementById('charts').setAttribute('style',"visibility:hidden;display:none");
    }
    
//    alert( 'The number of options selected is: ' + opts.length );
    var data_points = {
        labels: [],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "#696969",
                pointColor: "#696969",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF8C00",
                pointColor: "#FF8C00",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF6347",
                pointColor: "#FF6347",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#9ACD32",
                pointColor: "#9ACD32",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }

        ]
    };


    var data_gwrank = {
        labels: [],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "#696969",
                pointColor: "#696969",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF8C00",
                pointColor: "#FF8C00",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF6347",
                pointColor: "#FF6347",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#9ACD32",
                pointColor: "#9ACD32",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    var data_orank = {
        labels: [],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "#696969",
                pointColor: "#696969",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF8C00",
                pointColor: "#FF8C00",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FF6347",
                pointColor: "#FF6347",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#9ACD32",
                pointColor: "#9ACD32",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
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
        yAxisMinimumInterval:1,
        //String - A legend template
        legend:true,
        legendFontFamily : "'Arial'",
        legendFontSize : 12,
        legendFontStyle : "normal",
        legendFontColor : "#666",
        legendBlockSize : 50,
        legendBorders : true,
        legendBordersWidth : 1,
        legendBordersColors : "#666",
        showSingleLegend:true

    };


    var options_gwrank = {


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
        legend:true,
        legendFontFamily : "'Arial'",
        legendFontSize : 12,
        legendFontStyle : "normal",
        legendFontColor : "#666",
        legendBlockSize : 50,
        legendBorders : true,
        legendBordersWidth : 1,
        legendBordersColors : "#666",
        showSingleLegend:true

    };
    var options_orank = {


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
        //String - A legend template
//        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        legend:true,
        legendFontFamily : "'Arial'",
        legendFontSize : 12,
        legendFontStyle : "normal",
        legendFontColor : "#666",
        legendBlockSize : 50,
        legendBorders : true,
        legendBordersWidth : 1,
        legendBordersColors : "#666",
        showSingleLegend:true
    };


    for(var j=0;j<opts.length;j++)
    {
        var team_name = opts[j];
        if(check == false)
            break;
        if (localStorage.getItem("teams") === null) {
            teams = {};
        }
        else
        {
            teams = JSON.parse(localStorage['teams']);
            team = teams[opts[j]];
        }        
        var theUrl = "http://cors.io/?u=http://fantasy.premierleague.com/entry/"+team+"/history/";
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
                    for(var i=1;i<=gameweek;i++)
                    {
                      data_points.datasets[j].data[i-1] = points[i+1].innerHTML;
                      var text = gwrank[i+1].innerHTML;
                      text = text.replace(',','');
                      text = text.replace(',','');
                      data_gwrank.datasets[j].data[i-1] = text;
                      var text = orank[i+1].innerHTML;
                      text = text.replace(',','');
                      text = text.replace(',','');
                      data_orank.datasets[j].data[i-1] = text;
                      data_points.labels[i-1] = "GW "+i;
                      data_gwrank.labels[i-1] = "GW "+i;
                      data_orank.labels[i-1] = "GW "+i;
                      data_orank.datasets[j].title = team_name;
                      data_gwrank.datasets[j].title = team_name;
                      data_points.datasets[j].title = team_name;
                    }
                }
            }
            xmlhttp.open("GET", theUrl, false );
            try{
                xmlhttp.send();    
        var ctx = document.getElementById("chart_points_comp").getContext("2d");
        var myLineChart = new Chart(ctx).Line(data_points,options_points);
        var ctx = document.getElementById("chart_gwrank_comp").getContext("2d");
        var myLineChart = new Chart(ctx).Line(data_gwrank,options_gwrank);
        var ctx = document.getElementById("chart_orank_comp").getContext("2d");
        var chart = new Chart(ctx);
        var LineChart = chart.Line(data_orank,options_orank);
        document.getElementById('charts').setAttribute('style',"visibility:visible;display:block");
            }
            catch(e) {
                document.getElementById('charts').setAttribute('style',"visibility:hidden;display:none");
                alert("An error occured. Check your internet connection or check your team ID or maybe FPL server is busy. Just give a try after some time.");
                break;
            }
    }

})


    function load_teams(){
      var x = document.getElementById("team_select_1");
      var y = document.getElementById("team_select_2");
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


function getSelectedOptions(sel) {
    var opts = [], opt;
    
    // loop through options in select list
    for (var i=0, len=sel.options.length; i<len; i++) {
        opt = sel.options[i];
        
        // check if selected
        if ( opt.selected ) {
            // add to array of option elements to return from this function
            opts.push(opt.value);
            
            // invoke optional callback function if provided
        }
    }
    
    // return array containing references to selected option elements
    return opts;
}

})