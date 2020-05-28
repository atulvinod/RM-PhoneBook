var express = require('express');
var router = express.Router();
const contactSchema = require('../models/contact');


/* GET users listing. */
router.post('/newContact', function (req, res, next) {



  //Query the database to check if number already exists
  contactSchema.find({

    phoneNumber: {
      $in: req.body.phoneNumber
    },

  }).then(result => {

    // If the number dosent exist, then result length will be zero, then create the document
    if (result.length == 0) {
      contactSchema.create(req.body).then(result => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(result);
      }).catch((err) => {
        console.log(err)
        res.json(err);
      })
    } else {
      console.log('Already Exists', result)
    }
  })



});
router.get('/allContacts', function (req, res, next) {

  contactSchema.find({}).then(result => {
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  })

})

router.post('/getSingleContact', (req, res, next) => {
  contactSchema.findById({
    _id: req.body.id
  }).then(result => {
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  })
})

router.put('/updateContact', (req, res, next) => {
  contactSchema.findOneAndUpdate({
    _id: req.body._id
  }, req.body, {
    new: true,
    upsert: true
  }).then(result => {
    console.log(result)
  })
})

module.exports = router;