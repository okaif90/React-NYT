// Dependencies for node.js apps and web scraping
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('Cheerio');

// Import Comment and Article models
var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

// Index Page Render (first visit to the site)
router.get('/', function (req, res){

// Articles Page Render
router.get('/articles', function (req, res){

// Query MongoDB 
  Article.find().sort({_id: -1})

// Populate comments and send them to handlebards
    .populate('comments')

    .exec(function(err, doc){
      if (err){
        console.log(err);
      } 
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });


// Web Scraping code
router.get('/scrape', function(req, res) {
// HTML Body
  request('http://www.theonion.com/', function(error, response, html) {
// Cheerio HTML
    var $ = cheerio.load(html);
    var titlesArray = [];

// "Inner" class
    $('article .inner').each(function(i, element) {
// Create an empty result object
    var result = {};
// Collect Article Title
    result.title = $(this).children('header').children('h2').text().trim() + "";
// Collect Article Link
    result.link = 'http://www.theonion.com' + $(this).children('header').children('h2').children('a').attr('href').trim();
// Collect Article Summary
    result.summary = $(this).children('div').text().trim() + "";
    if(result.title !== "" &&  result.summary !== ""){
// Push saved item to titlesArray to prevent duplicate
    titlesArray.push(result.title);
// Add entry to the database if not there
    Article.count({ title: result.title}, function (err, test){
    if(test == 0){

// New entry
      var entry = new Article (result);
// Save entry in MongoDB
      entry.save(function(err, doc) {
      if (err) {
      console.log(err);
                  } 
      else {
      console.log(doc);}
      });
    }

// Log that scrape works but duplicate
      else{
      console.log('Redundant Database Content. Not saved to DB.')}
    });
        }
      else{
      console.log('Redundant Onion Content. Not Saved to DB.')
        }
      else{
        console.log('Empty Content. Not Saved to DB.')
      }
    });

// User sent to Articles page
    res.redirect("/articles");
   });
    });

// New User entry
  var entry = new Comment (result);
// Save entry to DB
  entry.save(function(err, doc) {

  if (err) {
  console.log(err);

};

// Export Router to Server.js
module.exports = router;