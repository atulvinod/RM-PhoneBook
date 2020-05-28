var express = require('express');
var router = express.Router();
const contactSchema = require('../models/contact');


/* GET users listing. */
router.post('/newContact', function(req, res, next) {
  console.log(req.body)
  contactSchema.create(req.body).then(result=>{
    res.setHeader('Content-Type','application/json');
    res.statusCode = 200;
    res.json(result);
  }).catch((err)=>{
    console.log(err)
    res.json(err);
  })
});

module.exports = router;
