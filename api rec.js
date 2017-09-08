
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "55779b1569cfce5805fcfe677baf84137798fcc8"

},{}],2:[function(require,module,exports){
//business logic
var apiKey = require('./../.env').apiKey;
/* getting api key from env file */

function Username(identity) {
  this.identity = identity;
}

Username.prototype.getRepos = function() {
  $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response) {
    console.log(response);
  }).fail(function(error) {
    console.log(error.JSON.message);
  });
};

//ui logic
$(document).ready(function() {
  $("#github").submit(function(event) {
    /* display info when user clicks on the check button */
    var inputUsername = $("input#user").val();
//creates an instance of the Repo constructor
    var repo = new Repo(inputUsername);
    githubName.getName();
    githubName.getRepos();
    event.preventDefault();
  });
});

exports.usernameModule = Username;

},{"./../.env":1}],3:[function(require,module,exports){
var getRepo = require('./../js/repo.js').getRepos;

},{"./../js/repo.js":2}]},{},[3]);
