const bcrypt = require('bcrypt');
const userModel = require('./models/user-model');

//------------GET ALL
exports.getAll = (req,res) => {
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
}

//-----------------GET ONE BY ID
exports.getById = (req,res) => {
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
}

//------------------UPDATE
exports.updateById = (req,res) => {
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
}

//-----------------REGISTER
exports.newUser = async (req,res) => {
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
}

//-----------------LOGIN
// app.post('/login/:username/:pass', async (req,res) => {
//     const username = req.params.username;
//     const pass = req.params.pass;
//     const user = userModel.findOne()
//     userModel.findOne({
//         userName: userName
//     })
//     .then(result => {
//         bcrypt.compare(pass, hashedPass, function (err, compareRes) {
//             if(err) {
//                 return err;
//             } else if(!compareRes) {
//                 return 'Wrong password'
//             } else {
//                 res.send(result);
//             }
//         })
//     })
// })

