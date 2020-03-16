var app= angular.module("myApp",[]);

app.controller("ResumeControler",function($scope,$http){
    
    // fetching data on page load
    $scope.getJobs = function() {

    // retrieving data from local storage
    $scope.retrievePersonal=JSON.parse(window.localStorage.getItem("saini_personal_info"));
    if($scope.retrievePersonal)
    {
        $scope.firstname = $scope.retrievePersonal[0].firstname;
        $scope.lastname = $scope.retrievePersonal[0].lastname;
        $scope.emailaddress = $scope.retrievePersonal[0].emailaddress;
        $scope.phone = $scope.retrievePersonal[0].phone;
        $scope.dob = $scope.retrievePersonal[0].dob;
        $scope.address1 = $scope.retrievePersonal[0].address1;
        $scope.address2 = $scope.retrievePersonal[0].address2;
        $scope.gender = $scope.retrievePersonal[0].gender;
        $scope.zipcode = $scope.retrievePersonal[0].zipcode;
        $scope.city = $scope.retrievePersonal[0].city;
        $scope.state = $scope.retrievePersonal[0].state;
        $scope.country = $scope.retrievePersonal[0].country;
        $scope.notes = $scope.retrievePersonal[0].notes;    
    }
    if(window.localStorage.getItem("saini_educational_info")){
        $scope.columns=JSON.parse(window.localStorage.getItem("saini_educational_info"));
    }

    if(window.localStorage.getItem("saini_professional_info")){
        $scope.profs=JSON.parse(window.localStorage.getItem("saini_professional_info"));
    }

    if(window.localStorage.getItem("saini_skills_info")){
        $scope.skills=JSON.parse(window.localStorage.getItem("saini_skills_info"));
    }

// function to create donut chart

    $scope.newarray = [];
    angular.forEach($scope.skills, function (value, key) {
       $scope.newarray.push({skills: value.skills, proficient: value.proficient });
    });

    var myCanvas = document.getElementById("testCanvas");
    myCanvas.width = 300;
    myCanvas.height = 300;
     
    var ctx = myCanvas.getContext("2d");
    var myLegend = document.getElementById("myLegend");


    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var myVinyls = $scope.newarray; // passing skills value

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d"); // get 2d context
    this.colors = options.colors;
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        var i =0;
        for (var categ in this.options.data){
            var val1 = this.options.data[i].proficient;
            var val = Number(val1);
            total_value += val;
            i++;
        }
 
        var start_angle = 0;
        var  k = 0;
        for (categ in this.options.data){
            var val1 = this.options.data[k].proficient;
            var val = Number(val1);
            var slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
 
            start_angle += slice_angle;
            color_index++;
            k++;
        }
 
        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                0,
                2 * Math.PI,
                "#FFF"
            );

if (this.options.legend){
            color_index = 0;
            var legendHTML = "";
            var t = 0;
            for (categ in this.options.data){
                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+this.options.data[t].skills+"</div>";
                t++;
            }
            this.options.legend.innerHTML = legendHTML;
        }
        
            start_angle = 0;
            v = 0;
for (categ in this.options.data){
    var val1 = this.options.data[v].proficient;
    var val = Number(val1);
    slice_angle = 2 * Math.PI * val / total_value;
    var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
    var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
    var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
 
    if (this.options.doughnutHoleSize){
        var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
        labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
        labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);               
    }
 
    var labelText = Math.round(100 * val / total_value);
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText(labelText+"%", labelX,labelY);
    start_angle += slice_angle;
    v++;
}

        }
 
    }
}

// creation of donut chart
var myDougnutChart = new Piechart(
    {
        canvas:myCanvas,
        data:myVinyls,
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88","#ff5733","#FF0000","#FFA500","#FFFACD","#FFDAB9","#00FF7F","#8FBC8F","#F0FFF0","#7FFF00","#FFFF00","#FAEBD7","#F0E68C","#4B0082","#A52A2A","#800000","#D2B48C","#CD853F","#FF6347","#2F4F4F","#F5DEB3","#808080","#FFD700","#00CED1","#FF00FF","#228B22","#00008B","#3CB371","#808000","#B0C4DE","#7CFC00","#D2691E","#8B0000"],
        doughnutHoleSize:0.5, // size of hole inside circle
        legend:myLegend // data for legends to be shown
    }
);
myDougnutChart.draw(); // calling the function to draw the donut chart
    }
    
    // download the work done as pdf file
    $scope.view_pdf = function(){
        html2canvas(document.getElementById('widget'), {
            onrendered: function (canvas) {

                var data = canvas.toDataURL();
                document.getElementById('widget').classList.add('x2');
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download($scope.firstname+"_resume.pdf");
            }
        });
    };


    // clear local storage
    $scope.clearStorage = function() {

    // confimation message before clearing local storage
     var r = confirm("All saved data will be lost. Continue ?");
     if(r == true)
     {
       window.localStorage.clear();
       window.location.assign("index.html");
     }
  };

  // go back to previous page by this function
    $scope.goBack = function() {
     window.location.assign("build-resume.html");
  };
});

