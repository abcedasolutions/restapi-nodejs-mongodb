const getModelByName = require('../db/getModelByName');

module.exports.signup = function(req, res){
    if(!req.body.user) return res.status(200).send({success: false, error:'usuario no encontrado'});
    const User = getModelByName('user');

    try{
        User.signup(req.body.user)
            .then(()=>{
                res.status(200).send({success: true, message:'usuario se ha creado correctamente'});
            })
            .catch(error=> res.status(200).send({success: false, error: error.message}))
    }catch(error){
        res.status(500).send({ success: false, error: error.message });
    }
}

module.exports.confirmAccount = function(req, res){
    const User = getModelByName('user');
    try{
        User.confirmAccount(req.params.token)
            .then(()=> {
                res.status(200).send({success: true, message:'usuario confirmado correctamente'});
            })
            .catch(err=> res.status(200).send({ success: false, error: err.message}))
    }catch(err){
        res.status(500).send({success: false, error: err.message});
    }
}