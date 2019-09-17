require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const app = express();
const User = require('./models/user')
const Players = require('./models/players')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet())
app.use(express.static(__dirname + '/client/build')); 

const loginLimiter = new RateLimit({
    windowMs: 5 * 60 * 100,
    max: 3,
    delayMs: 0,
    message: "Maximum login attempts exceeded!"
})

const signupLimiter = new RateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    delayMs: 0,
    message: "Maximum accounts created please try again later"
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to mongo on ${db.host}: ${db.port}`);
});
db.on('error', (err) => {
    console.log(`Database error: \n ${err}`)
})

//========================================================================//
//======== All MY GET ROUTES SECTIONS====//



// Get all users
app.get('/users', (req, res) => {
    User.find({}, function (err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

// Get users by id
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) res.json(err)
        res.json(user)
    });
})

// Get all fav players
app.get('/users/:id/players', (req, res) => {
    User.findById(req.params.id).populate('players').exec((err, user) => {
        if (err) res.json(err)
        res.json(user)
    })
})

//get a specific fav player from a specific user
app.get('/users/:id/players/:id', (req, res) => {
    User.findById(req.params.id).then((article) => {
        Players.findById(req.params.id, function (err, players) {
            if (err) {
                res.json(err)
            }
            res.json(players)
        })
    })
})

//get all fav players
app.get('/players', (req, res) => {
    Players.find({}, function (err, players) {
        if (err) {
            res.json(err)
        }
        res.json(players)
    })

})

app.get('/players/:id', (req, res) => {
    Players.findById(req.params.id, function (err, players) {
        if (err) res.json(err)
        res.json(players)
    });

})


//================================================================================

// ALL MY POST ROUTES

//create a new fav player
app.post('/users/:id/players', (req, res) => {
    User.findById(req.params.id, function (err, user) {
        // console.log("We got the user")
        Players.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            playerId:req.body.playerId
        }, function (err, player) {
            user.players.push(player)
            user.save(function (err, user) {
                if (err) console.log(err)
                res.json(user)
            })
        })
    })

})

//==========================================================================

// MY EDIT ROUTE

app.put("/players/:id", (req, res) => {
    Players.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        playerId:req.body.playerId
    }, {
            new: true
        }, (err, players) => {
            res.json(players);
        });
});

//======================================================================================



app.delete("/users/:uid/players/:pid", (req, res) => {
    console.log("hitting the delete route")
    User.findById(req.params.uid, (err, user) => {
        Players.deleteOne({ _id: req.params.pid }, (err, data) => {
            if (err) res.json(err)
            res.json(data);
        })
    })
})



//==================================================================================================






// app.use('/auth/login', loginLimiter)
// app.use('/auth/signup', signupLimiter)

app.use('/auth', require('./routes/auth'));
app.use('/balling', require('./routes/balling'));
app.use('/api', expressJWT({ secret: process.env.JWT_SECRET }), require('./routes/api'));


app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`Your listening to port ${process.env.PORT}...`)
})