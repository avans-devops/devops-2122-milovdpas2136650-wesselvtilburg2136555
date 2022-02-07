const express = require('express');
const router = express.Router();
const dbo = require('../services/database');
 
router.route('/').get((req, res) => {
    dbo.getDb().then(db => {
      db.collection("users")
        .find({}).limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching users!");
          } else {
              console.log(result)
              res.json(result);
          }
        });
      }
    );
  })
  .post((req, res) => {
    dbo.getDb().then(db => {
      db.collection("users")
      .insertOne(req.body, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting user!");
        } else {
          console.log('id', result.insertedId);
          res.status(204).send();
        }
      });
    });
  });

module.exports = router; 