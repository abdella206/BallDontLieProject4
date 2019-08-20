const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Players = require('../models/players')
const User = require('../models/user')







// router.get('/users', (req, res) => {
//     User.find({}, function (err, users) {
//         if (err) res.json(err)
//         res.json(users)
//     })
// })




// post fave players
// router.post('/players', (req, res) => {
//     Players.create({
//         name: req.body.name
//     }, function (err, players) {
//         res.json(players)
//     })
// })


// router.post('/users/:id/players', (req, res) => {
//     Players.create({
//         name: req.body.name
//     }, function (err, players) {
//         res.json(players)
//     })
// })



// find all players
// router.get('/players', (req, res) => {
//     Players.find({}, function (err, players) {
//         if (err) {
//             res.json(err)
//         }
//         res.json(players)
//     })

// })

// router.get('/users/:id/players', (req, res) => {
//     User.findById(req.params.id).then((players) => {
//         PLayers.find({}, function (err, players) {
//             if (err) {
//                 res.json(err)
//             }
//             res.json(players)
//         })
//     })
// })





//// Get players by id
// router.get('/players/:id', (req, res) => {
//     Players.findById(req.params.id, function (err, players) {
//         if (err) res.json(err)
//         res.json(players)
//     });

// })


// //// Update players
// router.put("/players/:id", (req, res) => {
//     Players.findByIdAndUpdate(req.params.id, {
//         name: req.body.name
//     }, {
//             new: true
//         }, (err, players) => {
//             res.json(players);
//         });
// });



// // DELETE player for a user

// router.delete("/players/:id", (req, res) => {
//     User.findById(req.params.uid, (err, user) => {
//         Players.deleteOne({ _id: req.params.id }, err => {
//             if (err) res.json(err)
//             res.json(1);
//         })
//     })
// })





// router.delete("/users/:uid/players/:pid", (req, res) => {
//     User.findById(req.params.uid, (err, user) => {
//         user.players.pull(req.params.pid)
//         user.save(err => {
//             if (err) res.json(err)
//             Players.deleteOne({ _id: req.params.pid }, err => {
//                 if (err) res.json(err)
//                 res.json(1);
//             })
//         })
//     })
// })


module.exports = router;