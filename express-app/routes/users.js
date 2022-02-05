const express = require('express');
const router = express.Router();
const dbo = require('../services/database');

router.route('/').get((req, res) => {
    dbo.getDb().then(db => {
            db.collection("users")
                .find({}).limit(50)
                .toArray(function (err, result) {
                    if (err) {
                        res.json(400, {
                            success: false,
                            message: 'Error fetching users!'
                        });
                    } else {
                        res.json(result);
                    }
                });
        }
    );
})
    .post((req, res) => {
        dbo.getDb().then(db => {
            db.collection("users")
                .insertOne(req.body, function (err) {
                    if (err) {
                        res.json(400, {
                            success: false,
                            message: 'Error inserting user!'
                        });
                    } else {
                        res.json(203, {
                            success: true,
                            message: 'User created successfully'
                        });
                    }
                });
        });
    });

module.exports = router; 
