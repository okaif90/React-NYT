// Require Mongoose, Schemas, and Data
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    type: String
  },
  content: {
    type: String
  }
  
});
// Mongoose comment model
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;