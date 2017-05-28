const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user parent node
const userSchema = new Schema({
    name: String,
    email: String,
    birthday: String,
    relationshipStatus: String,
    sex: String,
    location: String,
    bio: String
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
    // Returns all users
    User.find((err, users) => {

        if (err) 
            return res.send(err);
        
        res.send(users);

    });
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

// TODO NEXT: Make Update User Data Work
app.post('/users/update', (req, res) => {
    alert("update called");
    // Update user and send to client
    User.findById(req.params.email, function(err, thisUser)
    {
        thisUser = new User(req.body);

        thisUser.save((err, user) => {

        if (err) 
            return res.send(err);
        
        res.send(user);
        });
    
    });
});

app.use(function (req, res) {
    res.sendFile(__dirname + '/main.js');
});

// Start server
const server = app.listen('3000', function () {
    console.log('Server up and running at port ' + server.address().port);
});
