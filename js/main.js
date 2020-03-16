var app= angular.module("myApp",[]);
app.controller("ResumeControler", function($scope) {

    // saving data to the local storage
    $scope.saveData=function(){
        $scope.personal = [{
                            firstname: $scope.firstname,
                            lastname: $scope.lastname,
                            emailaddress: $scope.emailaddress,
                            phone: $scope.phone,
                            address1: $scope.address1,
                            address2: $scope.address2,
                            zipcode: $scope.zipcode,
                            city: $scope.city,
                            state: $scope.state,
                            country: $scope.country,
                            notes: $scope.notes
                          }];

        window.localStorage.setItem("saini_personal_info",JSON.stringify($scope.personal));
        window.localStorage.setItem("saini_educational_info",JSON.stringify($scope.columns));
        window.localStorage.setItem("saini_professional_info",JSON.stringify($scope.profs));
        window.localStorage.setItem("saini_skills_info",JSON.stringify($scope.skills));
        alert('Your work saved successfully'); // success message after saving to local storage
    };

   
$scope.columns = [{index: 'col1', startYear:'', endYear:'', program: '', course: ''}];

// add more column option for education
    $scope.addNewColumn = function() {
    var newItemNo = $scope.columns.length+1;
    $scope.columns.push({'index':'col'+newItemNo});
  };

// remove column from education portion
    $scope.removeColumn = function(index) {

    // remove the row specified in index
  $scope.columns.splice( index, 1);
  };



  $scope.profs = [{index: 'profs_col1', designation:'', field:'', company: '', c_startYear: '', c_endYear: '',duties:''}];

// add more column option for professional experience
    $scope.addNewColumnprof = function() {
    var newItemNo = $scope.profs.length+1;
    $scope.profs.push({'index':'profs_col'+newItemNo});
  };

// remove column from professional portion
    $scope.removeColumnprof = function(index) {

    // remove the row specified in index
  $scope.profs.splice( index, 1);
  };


  $scope.skills = [{index: 'skills_col1', skills:'', proficient:''}];

// add more column option for skills
    $scope.addNewColumnskill = function() {
    var newItemNo = $scope.skills.length+1;
    $scope.skills.push({'index':'skill_col'+newItemNo});
  };

// remove column from different skills
    $scope.removeColumnskill = function(index) {

    // remove the row specified in index
  $scope.skills.splice( index, 1);
  };


  // retrieve data from local storage on page load

  $scope.retrieveData=function(){
    $scope.retrievePersonal=JSON.parse(window.localStorage.getItem("saini_personal_info"));
if($scope.retrievePersonal){
    $scope.firstname = $scope.retrievePersonal[0].firstname;
    $scope.lastname = $scope.retrievePersonal[0].lastname;
    $scope.emailaddress = $scope.retrievePersonal[0].emailaddress;
    $scope.phone = $scope.retrievePersonal[0].phone;
    $scope.address1 = $scope.retrievePersonal[0].address1;
    $scope.address2 = $scope.retrievePersonal[0].address2;
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

// data retrieved from all the local storage fieldss
    };


    // clear local storage for discard button

    $scope.clearStorage = function() {

      // confimation message before clearing local storage
     var r = confirm("All saved data will be lost. Continue ?");
     if(r == true)
     {
       window.localStorage.clear();
       window.location.assign("index.html");
     }
  };

  // for new button

  $scope.newProject = function() {

      // confimation message before clearing local storage
     var r = confirm("All saved data will be lost. Continue ?");
     if(r == true)
     {
       window.localStorage.clear();
       window.location.assign("build-resume.html");
     }
  };

  // View your work on different page 

  $scope.viewWork = function() {
     window.location.assign("view-resume.html");
  };

  // go back to the home page

    $scope.goBack = function() {
     window.location.assign("index.html");
  };

});
  