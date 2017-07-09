const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user parent node
const userSchema = new Schema({
    name: String,
    email: String,
    birthday: String,
    relationshipStatus: {
        type: String,
        default: 'Single'
    },
    sex: String,
    location: String,
    bio: String,
    glanced: Array,
    places: [
        {
            title: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        }
    ]
}, {versionKey: false});

const User = mongoose.model("User", userSchema);

// Create Express server
const app = express();

// Register Express middleware bodyParser: allows us to access the request body
// of route requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure Mongoose and connect to MongoDB
mongoose.Promise = global.Promise;
try {
    mongoose.connect('mongodb://localhost/glance');
    console.log('connected to mongoDB');

} catch (e) {
    console.log('ERROR: could not connect to mongoDB. Is it running? (use `mongod`)');
    process.exit(1);
}

app.get('/users', (req, res) => {
    if (req.query.getType == 'myUser') {
        User
            .findOne({
                email: req.query.email
            }, function (err, user) {
                if (err) 
                    return res.send(err);
                
                // objects of the users
                res.send(user);
            });
    } else if (req.query.getType == 'usersWithSamePlace') {
        User
            .find({
                places: {
                    lat: req.query.lat,
                    lng: req.query.lng
                }
            }, function (err, users) {
                if (err) 
                    return res.send(err);
                
                // objects of the users
                res.send(users);
            });

    }
});

app.post('/users', (req, res) => {
    // Adds new user to database and returns to client
    const newUser = new User(req.body);

    newUser.save((err, user) => {

        if (err) 
            return res.send(err);
        
        res.send(user);
    });

});

app.put('/users', (req, res) => {

    if (req.body.updateType == "profile") {
        // Submits changes to user profile
        User
            .findOneAndUpdate({
                email: req.body.email
            }, {
                name: req.body.name,
                birthday: req.body.birthday,
                relationshipStatus: req.body.relationshipStatus,
                sex: req.body.sex,
                location: req.body.location,
                bio: req.body.bio
            }, function (err, user) {
                if (err) 
                    return res.send(err);
                
                // we have the updated user returned to us
                res.send(user);
            });
    } else if (req.body.updateType == "addPlace") {
        // Add place to array
        User
            .findOneAndUpdate({
                email: req.body.email
            }, {
                $push: {
                    "places": {
                        title: req.body.placeTitle,
                        label: req.body.placeLabel,
                        lat: req.body.lat,
                        lng: req.body.lng
                    }
                }
            }, {
                new: true
            }, function (err, user) {
                if (err) 
                    return res.send(err);
                
                // we have the updated user returned to us
                res.send(user);
            });
    } else if (req.body.updateType == "deletePlace") {
        User
            .findOneAndUpdate({
                email: req.body.email
            }, {
                $pull: {
                    "places": {
                        _id: req.body.id
                    }
                }
            }, {
                new: true
            }, function (err, user) {
                if (err) 
                    alert(err);
                
                // we have the updated user returned to us
                res.send(user);
            });
    }
});

app.use(function (req, res) {
    res.sendFile(__dirname + '/main.js');
});

// Start server
const server = app.listen('3000', function () {
    console.log('Server up and running at port ' + server.address().port);
});
