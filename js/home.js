var app= angular.module("myApp",[]);
app.controller("ResumeControler", function($scope) {

  // retrieve data on page load
  $scope.fetchiniData=function(){
    $scope.retrievePersonal=JSON.parse(window.localStorage.getItem("saini_personal_info"));
    $scope.columns=JSON.parse(window.localStorage.getItem("saini_educational_info"));
    $scope.profs=JSON.parse(window.localStorage.getItem("saini_professional_info"));
    $scope.skills=JSON.parse(window.localStorage.getItem("saini_skills_info"));
    var hideedit = document.getElementById("hide_edit");
      if(($scope.retrievePersonal != null) || ($scope.columns != null) || ($scope.profs != null) || ($scope.skills != null))
      {
          // show option to continue building up existing resume
          hideedit.style.display = "block";
      }
      else
      {
          // hide option to continue building up existing resume
          hideedit.style.display = "none";
      }
    };

    // build new resume
    $scope.freshWork = function() {
     window.localStorage.clear();
     window.location.assign("build-resume.html");
  };
});
  