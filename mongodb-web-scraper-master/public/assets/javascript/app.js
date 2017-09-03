$(document).ready(function(){

// Navigation Bar
  $(".button-collapse").sideNav();

//Listener to create FORM SUBMISSION and ADD comment
  $('.add-comment-button').on('click', function(){
//Comments that need to be deleted based on their ID
  var articleId = $(this).data("id");

// URL root for Heroku, I HAVE BEEN UNABLE TO USE HEROKU TO THIS POINT
  //var baseURL = window.location.origin;

// AJAX deletion of comments
  $.ajax({
  url: baseURL + '/add/comment/' + articleId,
  type: 'POST',
  data: frm.serialize(),
  })
  .done(function() {
  });

//Creation of listener to Delete Comments
  $('.delete-comment-button').on('click', function(){
  var commentId = $(this).data("id");
// URL root for Heroku, I HAVE BEEN UNABLE TO USE HEROKU TO THIS POINT
  //var baseURL = window.location.origin;

// AJAX deletion of comments
  $.ajax({
  url: baseURL + '/add/comment/' + articleId,
  type: 'POST',
  data: frm.serialize(),
  })
  .done(function() {
  });
  });
  
});