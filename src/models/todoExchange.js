const mongoose = require('mongoose');
const axios = require('axios');

const TodoExchangeSchema = mongoose.Schema({
        tipo_de_cambio:{
            type: String,
            required: true,
            trim: true,
        },
        tasa_de_cambio: {
            _id: {
              type: String,
              required: true,
            },
            purchase_price: {
              type: Number,
              required: true,
            },
            sale_price: {
              type: Number,
              required: true,   
            },
        },
        monto_enviar:{
            type: Number,
            required: true,
            default: 0.00,
        },
        monto_recibir:{
            type: Number,
            required: true,
            default: 0.00,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
}); 

TodoExchangeSchema.statics.create = create;
TodoExchangeSchema.statics.getAll = getAll;
TodoExchangeSchema.statics.getOneTodo = getOneTodo;
TodoExchangeSchema.statics.deleteTodo = deleteTodo;

mongoose.model('todoExchange',TodoExchangeSchema,'todosExchange');

async function create(body, user){

    if(!body.tipo_de_cambio) throw new Error('debe ingresar la operación a realizar (compra o venta).');
    if(!body.monto_enviar) throw new Error('debe ingresar una cantidad de dinero a cambiar.');
 
    const { tipo_de_cambio, monto_enviar } = body;
    const tasa_de_cambio = await axios.get('https://api.test.cambioseguro.com/api/v1.1/config/rates').then(resp=> {return resp});
    const datos = tasa_de_cambio.data;

    if (!datos) throw new Error('Error al obtener la tasa de cambio.');
  
    const monto_recibir = tipo_de_cambio === 'compra' ? monto_enviar * datos.data.purchase_price : monto_enviar / datos.data.sale_price;

    const exchangeObject = {
      tipo_de_cambio: tipo_de_cambio,
      tasa_de_cambio: {
        _id: datos.data._id,
        purchase_price: datos.data.purchase_price,
        sale_price: datos.data.sale_price,
    },
      monto_enviar: monto_enviar,
      monto_recibir: monto_recibir,
      userId: user._id,
  }
    const todoExchange = new this(exchangeObject);

    return todoExchange.save();
}

function getAll(user){
  return this.find({ userId: user._id});
}

function getOneTodo(id, user){
  return this.findOne({_id: id, userId: user._id})
          .then(todoExchange=>{
            if(!todoExchange) throw new Error('exchange no existe') 
            return todoExchange; 
          })
}

function deleteTodo(id, user){
  return this.findOneAndDelete({ _id: id, userId: user._id })
            .then(todoExchange => {
              if(!todoExchange) throw new Error('exchange no existe');
              return todoExchange;
            })
            ; 
}

