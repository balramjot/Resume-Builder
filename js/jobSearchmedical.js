var app= angular.module("myApp",[]);

app.controller("ResumeControler",function($scope,$http){
    
    // retrieve data initially on page load and on button click also using the same function
    $scope.getJobs = function() {
    var load = document.getElementById("loader");
    var sketch = document.getElementById("sketcher");
    load.style.display = "block";
    sketch.style.display = "none";
    if($scope.search == undefined)
    {
        $scope.search = 'nurse';
    }
    else
    {
        $scope.search;
    }
        
   // calling the web api
      $http.jsonp(
       'https://jobs.search.gov/jobs/search.json', // calling the url
         {
           params : {
             query : $scope.search, // passing search query parameter
             size : 30, // number of records to be displayed per page
             callback:'JSON_CALLBACK'
             
           }
         }).success(function(data, status, headers, config) { // success function after retrieveing data from web api
              load.style.display = "none";
              if(data != "")
              {
                // showing the result
                $scope.items = data;
                $scope.total = data.length+' results found';
              }
              else
              {
                // displaying error message
                sketch.style.display = "block";
              }
        });
        
    }
});