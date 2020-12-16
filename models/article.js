let mongoose = require('mongoose');

let time = function(date){
    let s = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    return s;
}

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
    // required: true
  },
  time:{
    type: String,
    default: time(new Date())
  },
  content: {
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
              type: String,
              default: time(new Date())
          }
      }
  ]
});

module.exports = mongoose.model('Article', articleSchema);
