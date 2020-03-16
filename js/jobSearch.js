var app= angular.module("myApp",[]);

app.controller("ResumeControler",function($scope,$http){
    
    // retrieve data initially on page load and on button click also using the same function
    $scope.getJobs = function() {
    var load = document.getElementById("loader");
    var sketch = document.getElementById("sketcher");
    var hidden_Val = document.getElementById("hidden_Val").value;
    load.style.display = "block";
    sketch.style.display = "none";
    
    if($scope.search == undefined)
    {
        $scope.search = 'all';
        hidden_Val = 'bostonma';
    }
    else
    {
        $scope.search;
        hidden_Val = hidden_Val;
    }
        
   // calling the web api
      $http.jsonp(
       'https://authenticjobs.com/api',   // passing the url
         {
           params : {
             api_key : '1a4de657937288eb3e5869fe26c0e4a8', // passing the api key
             method : 'aj.jobs.search', // method parameter
             keywords : $scope.search, // search keyword
             location : hidden_Val, // location if any
             format : 'json', // data retrieval format
             perpage : 30, // records to be shown per page
             callback:'JSON_CALLBACK'
             
           }
         }).success(function(data, status, headers, config) { // success function after retrieveing data from web api
             load.style.display = "none";
             if(data.listings.total > 0)
             {
                // showing the result
                $scope.items = data.listings.listing;
                $scope.total = data.listings.total+' results found';
             }
             else
             {
                // displaying error message
                sketch.style.display = "block";
                $scope.items = "";
                $scope.total = "";
             }
        });


         // for getting location list

         $http.jsonp(
       'https://authenticjobs.com/api', // url
         {
           params : {
             api_key : '1a4de657937288eb3e5869fe26c0e4a8', // api key
             method : 'aj.jobs.getlocations', // get location method
             format : 'json', // format of data
             callback:'JSON_CALLBACK'
             
           }
         }).success(function(dataloc, status, headers, config) {
             $scope.locs = dataloc.locations.location; // displaying data in select box
        });

        
    }
});