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

module.exports.login = function(req, res){
    if(!req.body.email) return res.status(200).send({success: false, error: 'email no fue recibido'});
    if(!req.body.password) return res.status(200).send({success: true, error: 'password no fue recibida'})
    const User = getModelByName('user');
    try{
        User.login(req.body.email, req.body.password)
            .then(
                data => {
                    res.status(200).send({ success: true, data});
                }
            )
            .catch(
                err => res.status(200).send({success: false, error: err.message})
            )

    }catch(err){
        res.status(200).send({success: false, error: err.message})    
    }
} 

module.exports.current_user = function(req, res){
    if(!req.user) return res.status(200).send({ success: false, data: {user : null}});
    const User = getModelByName('user');

    return User.findUserById(req.user._id)
            .then(user => {
                res.status(200).send({ success: true, data: {user}});
            })
            .catch( err => res.status(200).send({ success: false, error: err.message}))
}