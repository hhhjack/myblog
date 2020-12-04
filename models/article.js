let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  time:{
    type: Date,
    default: Date.now()
  },
  body: {
    type: String,
    required: true
  },
  isDel: {
    type: Number,
    default: 0
  },
  comments: [
      {
          user: String,
          message: String,
          comTime: {
              type: Data,
              default: Date.now()
          }
      }
  ]
});

module.exports = mongoose.model('Article', articleSchema);
