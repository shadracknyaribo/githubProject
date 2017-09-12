  var Username = require('./../js/lookup.js').usernameModule;
//ui logic
$(document).ready(function() {
  $("#github").submit(function(event) {
    /* display info when user clicks on the check button */
    var inputUsername = $("input#user").val();
    console.log("bye");
    console.log(inputUsername);
    //creates an instance of the Repo constructor
    var repo = new Username(inputUsername);
    console.log("bye2");
    repo.getName();
    repo.getRepos();
    event.preventDefault();
  });
});
