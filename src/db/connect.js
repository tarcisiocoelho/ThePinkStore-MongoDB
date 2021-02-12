const mongoose = require('mongoose');

function connect(){
    mongoose
    .connect('mongodb://localhost/recode', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado com o banco 'Recode' ")
    }).catch((error)=>{
        console.log(`Erro ao conectar ${error}`)
    })
}

module.exports = connect();