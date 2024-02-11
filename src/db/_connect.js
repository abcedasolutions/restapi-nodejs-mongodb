const mongoose = require('mongoose');

function _conect(){

    const URI = `mongodb://${process.env.user}:${process.env.password}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
    mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(
            ()=>{
                console.log("Conexion a la base de datos exitosa");
            },
            (err)=>{
                console.log("Error en la conexion - ",err);
            }

        )
}

module.exports = _conect;