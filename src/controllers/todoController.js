 const getModelByName = require('../db/getModelByName');


 module.exports.create = function(req, res){
    //if(!req.body.todoExchange) return res.status(200).send({success: false , error: 'no existe Informacion para Exchange.'});

    const TodoExchange = getModelByName('todoExchange');

    try{
        TodoExchange.create(req.body ,req.user)
            .then((todoExchange)=>{
                res.status(200).send({success: true, data: {todoExchange}});
            })
            .catch(err => res.status(200).send({ success: false, error: err.message}))
    }
    catch(error){
        res.status(500).send({ success: false, error: error.message})
    }
 }

 module.exports.getTodosExchange = function(req, res){
    const TodoExchange = getModelByName('todoExchange');

    TodoExchange.getAll(req.user)
        .then(todosExchange => {
            res.status(200).send({ success: true, data: {todosExchange}})
        })
        .catch(err => res.status(200).send({ success: false, error: err.message}))
        
 }

 module.exports.getTodoExchange = function(req, res){
    const TodoExchange = getModelByName('todoExchange');

    TodoExchange.getOneTodo(req.params.id, req.user)
        .then(todoExchange =>{
            res.status(200).send({success: true, data: {todoExchange}})
        })
        .catch(err => res.status(200).send({ success: false, error: err.message}))
    }

 module.exports.deleteTodoExchange = function(req, res){
    const TodoExchange = getModelByName('todoExchange');
    TodoExchange.deleteTodo(req.params.id, req.user)
        .then(()=>{
            res.status(200).send({ success: true, message: 'exchange eliminado correctamente.'});
        })
        .catch(err => res.status(200).send({success: false, error: err.message}))
}