var express = require('express');
var router = express.Router();
var bodyParser  = require("body-parser");
var fs = require('fs')
var file = './public/todos.json';

router.put('/',function(req, res, next){
  var data = fs.readFileSync(file);
  var results = JSON.parse(data);
  console.log('request', req.body)

  for (var i=0; i < results.length; i++) {
    if (results[i].id == req.body.id) {
      results[i] = req.body;
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
