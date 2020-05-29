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
        result['status'] = "success"
        res.json(result);
      }).catch((err) => {
        return next(err);
      })
    } else {

      // If the result exists, set the status to 'exists'
      let statusObject = {
        status: "exists"
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(statusObject)

    }
  })



});

//Return all the contacts
router.get('/allContacts', function (req, res, next) {

  contactSchema.find({}).then(result => {
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  })

})

//Get a contact via id
router.post('/getSingleContact', (req, res, next) => {
  contactSchema.findById({
    _id: req.body.id
  }).then(result => {
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  })
})


//Endpoint to update the contact
router.put('/updateContact', (req, res, next) => {


  //Check if the number is already present in another document
  contactSchema.find({

    phoneNumber: {
      $in: req.body.phoneNumber
    },

  }).then(result => {

    /**If the number is unique then the result length will be zero,
     * If the number exists but is part of the contact that is being updated, then proceed
     * As all the numbers are unique, the number will only be a part of one document, Hence check the 0th index
     */
    if (result.length == 0 || result[0]._id == (req.body._id)) {

      contactSchema.findOneAndUpdate({
        _id: req.body._id
      }, req.body, {
        new: true,
        upsert: true
      }).then(result => {
        res.json({
          status: "success"
        })
        console.log(result)
      })
    } else {

      let statusObject = {
        status: "exists",
        result
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(statusObject)

    }
  })

})

//Delete the contact via id
router.post('/deleteContact', (req, res, next) => {
  contactSchema.findByIdAndDelete({
    _id: req.body.id
  }).then(result => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      status: 'success'
    });
  }).catch(error => {
    console.log("Delete failed")
  })
  res.statusCode = 200;
})

// Search
router.post('/search', (req, res, next) => {


  //Create a regex for the query
  let query = req.body.query;
  let regexp = new RegExp(`${query}`, 'i');

  //Compare the regex with phone numbers, names and emails
  contactSchema.find({
    $or: [{
        phoneNumber: {
          $in: regexp
        }
      },
      {
        name: {
          $regex: regexp
        }
      },
      {
        email: {
          $in: regexp
        }
      }
    ]

  }).then(result => {
    res.statusCode = 200;
    res.setHeader("Content-Type", 'application/json')
    res.json(result)
  })
})

module.exports = router;