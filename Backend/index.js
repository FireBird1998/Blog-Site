const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');


const salt = bcrypt.genSaltSync(10);   
const secret = 'kjsdhfkjhasdklhsadfkhsadfkjhlkdsa' ;

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());

mongoose.connect('mongodb+srv://wwwdas5471:j7AOWbemXgK4tj0H@cluster007.b63gn6j.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch(err){
        res.status(400).json(err);
    }

    
});

app.post('/login',async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        //user Logged in 
        jwt.sign({username, id: userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json('ok');
        
        })
    }else {
        //not logged in
        res.status(400).json('Wrong credentials');
    }
})

app.listen(4000)

// wwwdas5471
// j7AOWbemXgK4tj0H