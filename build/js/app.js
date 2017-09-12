(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "a4411cd3bd75439c2c6aa1554c47c504a212d794"

},{}],2:[function(require,module,exports){
//business logic
var apiKey = require('./../.env').apiKey;
/* getting api key from env file */

function Username(name) {
  this.name = name;
}

Username.prototype.getRepos = function() {
  $.get('https://api.github.com/users/andykimchris' + this.name + '?access_token =' +apiKey).then(function(response) {
    console.log(response);
    $(".des").text(" ");
    $(".userInfo").append("<li>" + response.login + "</li>");
    $(".userInfo2").append("<li>" + "<a href=" + response.html_url + ">" + response.avatar_url + "</a>" + "</li>");
    $(".userInfo3").append("<li>" + response.followers + "</li>");
  }).fail(function(error) {
    console.log(error.JSON.message);
  });
};

Username.prototype.getName = function() {
  $.get('https://api.github.com/users/' + this.name + '/repos?access_token='  +apiKey).then(function(response) {
    console.log(response);
    $(".c").text(' ');
    for (var i = 0; i < response.length; i++) {
      $(".nameRepo").append("<li>" + response[i].name + "</li>");
      $(".desRepo").append("<li>" + response[i].description + "</li>");
    }
  }).fail(function(error) {
    console.log(error.JSON.message);
  });
};

exports.usernameModule = Username;

},{"./../.env":1}],3:[function(require,module,exports){
var username = require('./../js/repo.js').Username;

//ui logic
$(document).ready(function() {
  $("#github").submit(function(event) {
    /* display info when user clicks on the check button */
    var inputUsername = $("input#user").val();
    //creates an instance of the Repo constructor
    var repo = new Repo(inputUsername);
    repo.getName();
    repo.getRepos();
    event.preventDefault();
  });
});

},{"./../js/repo.js":2}]},{},[3]);
