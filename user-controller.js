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
    const user = userModel.findOne({
        username: userName
    }).then(result => {
        if(result) {
            res.send('User already exists');
        } else {
            userModel.create({
                username: userName,
                pass: hashPass
            })
            .then(result => {
                return res.send(result);
            })
            .catch(err => {
                return res.status(201).send(err);
            })
        }
    }).catch(err => {
        return res.status(201).send(err);
    })
}

//-----------------LOGIN
exports.login = (req,res) => {
    const userName = req.body.username;
    const pass = req.body.pass;
    const user = userModel.findOne({
        username: userName
    })
    .then(result => {
        const hashedPass = user.pass;
        const cmp = bcrypt.compare(pass, hashedPass);
        if (result) {
            if (cmp) {
              //   ..... further code to maintain authentication like jwt or sessions
              return res.send('Auth Successful');
            } else {
              return res.send('Wrong username or password.');
            }
        } else {
            return res.send('Wrong username or password.');
        }
    })
    .catch(err => {
        return res.status(500).send(err);
    })
}



