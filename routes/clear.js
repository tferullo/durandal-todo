var express = require('express');
var router = express.Router();
var bodyParser  = require("body-parser");
var fs = require('fs')
var file = './public/todos.json';

router.delete('/',function(req, res){
  var data = fs.readFileSync(file);
  var results = JSON.parse(data);
  for (var i=0; i < results.length; i++) {
    if (results[i].completed == true) {
      results.splice(i, 1)
    }
  }
  try {
    fs.writeFileSync(file, JSON.stringify(results, null, 2) , 'utf-8');
    res.send(200);
  }
  catch(e) {
    res.send(e);
  }
});

module.exports = router;
