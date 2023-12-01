const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleWare = multer({dest: 'uploads/'});
const post = require('./models/post');
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);   
const secret = 'kjsdhfkjhasdklhsadfkhsadfkjhlkdsa' ;

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


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
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        
        })
    }else {
        //not logged in
        res.status(400).json('Wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleWare.single('file'), async(req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];   
    const newPath = `uploads/${Date.now()}.${ext}`; 
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
        if(err) throw err;

        const {title, summary, content} = req.body;
        const postDoc = await post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });


        res.json(postDoc);
    });



    
});

app.get('/post', async(req, res) => {
    res.json(
        await post.find().populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
        );
});

app.get('/post/:id', async(req, res) => {
    const {id} = req.params;
    res.json(
        await post.findById(id).populate('author', ['username'])
        );

})

app.put('/post', uploadMiddleWare.single('file'), async(req, res) => {
    const {id} = req.params;
    let newPath = null;

    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];   
        newPath = `uploads/${Date.now()}.${ext}`; 
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
        if(err) return res.status(500).json({error: 'Failed to authenticate token.'});

        const {id, title, summary, content} = req.body;
        const postDoc = await post.findById(id);
        if(JSON.stringify(postDoc.author) != JSON.stringify(info.id)){
            return res.status(400).json('Unauthorized');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath || postDoc.cover,
        });

        res.json({message: 'Post updated successfully'});
    });
});

app.delete('/post/:id', async(req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
        if(err) return res.status(500).json({error: 'Failed to authenticate token.'});

        const postDoc = await post.findById(id);
        if(JSON.stringify(postDoc.author) != JSON.stringify(info.id)){
            return res.status(400).json('Unauthorized');
        }
        await postDoc.deleteOne();

        res.json({message: 'Post deleted successfully'});
    });

})

app.listen(4000, () => console.log('Server is running on port 4000'));

// wwwdas5471
// j7AOWbemXgK4tj0H