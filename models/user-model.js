const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    pass:{
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    // adress: [],
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users',userSchema);