//momentJS
var moment = require("moment");

//Mongoose dependency
var mongoose = require('mongoose');

//Schema creation
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({

// Title of Article which is a REQUIREMENT
  title: {
    type: String,
    required: true
  },

// Link to Article which is a REQUIREMENT
  link: {
    type: String,
    required: true
  },
  
// Summary of Article which is a REQUIREMENT
  summary: {
    type: String,
    required: true
  },

  // Data on time of Scrape and comments
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm A')
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

});

// Create Mongoose artcile and export it
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;