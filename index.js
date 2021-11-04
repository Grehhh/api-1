const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./api-routes');
const app = express();

const port = 3000;
const uri = 'mongodb://localhost/imported-json';

app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',apiRoutes);


mongoose.connect(uri, (err) => {
    if(err) {
        throw err
    } else {
        console.log('Conectado a ' + uri)
    }       //este condicional comprueba la conexion
}, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});            


app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})
