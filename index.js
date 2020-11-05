const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const userModel = require('./models/user-model.js');
const app = express();

const port = 3000;
const uri = 'mongodb://localhost/imported-json';

app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(uri, (err) => {
    if(err) {
        throw err
    } else {
        console.log('Conectado a ' + uri)
    }       //este condicional comprueba la conexion
}, {useNewUrlParser: true});            

//------------GET ALL
app.get('/users', (req,res) => {
    userModel.find()
    .then(result => {
        if(result === null) {
            return res.status(404).send({
                message: error
            })
        } else {
            return res.send(result);
        }
    })
    .catch(err => {
        return console.log(err);
    })
})

//-----------------GET ONE BY ID
app.get('/user/:userId', (req,res) => {
    const userId = req.params.userId;
    userModel.findById(userId)
    .then(result => {
        if(result === null) {
            return res.status(404).send({
                message: error
        })
        } else {
            return res.send(result);
        }
    })
    .catch(err => {
        return console.log(err)
    })
})

//------------------UPDATE
app.put('/update-user/:userId', (req,res) => {
    const userId = req.params.userId;
    const userName = req.body.username;
    userModel.findByIdAndUpdate(userId,{
        $set: {username: userName}
    },{ 
        new: true           //debe especificarse new:true para que la respuesta sea la del valor actualizado
    })
    .then(result => {
        if(result === null) {
            return res.status(404).send('Not found');
        } else {
            return res.send(result);
        }
    })
    .catch(err => {
        return console.log(err);
    })
})

//-----------------REGISTER
app.post('/new-user', async (req,res) => {
    const userName = req.body.username;
    const pass = req.body.pass;
    const hashPass = await bcrypt.hash(pass,2)
    userModel.create({
        username: userName,
        pass: hashPass
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(201).send(err)
    })
})

//-----------------LOGIN
app.post('/login/:username/:pass', async (req,res) => {
    const username = req.params.username;
    const pass = req.params.pass;
    const user = userModel.findOne()
    userModel.findOne({
        userName: userName
    })
    .then(result => {
        bcrypt.compare(pass, hashedPass, function (err, compareRes) {
            if(err) {
                return err;
            } else if(!compareRes) {
                return 'Wrong password'
            } else {
                res.send(result);
            }
        })
    })
})

app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})
