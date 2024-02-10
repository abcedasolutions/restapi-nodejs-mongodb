const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {isValidEmail} = require('../helpers');
const { current_user } = require('../controllers/userController');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    emailVerified:{
        type: Boolean,
        default: false,
    }
});

UserSchema.statics.signup = signup;
UserSchema.statics.sendConfirmationEmail = sendConfirmationEmail;
UserSchema.statics.confirmAccount = confirmAccount;
UserSchema.statics.login = login;
UserSchema.statics.findUserById = findUserById;

mongoose.model('user',UserSchema, 'users');

function signup(userInfo){
    if(!userInfo.email|| !isValidEmail(userInfo.email)) throw new Error('Email es invalido');
    if(!userInfo.password) throw new Error('la password es requerida');

    return this.findOne({ email: userInfo.email})
        .then(user=>{
            if(user) throw new Error('El email del usuario ya existe')
            const newUser = {
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password,9),
            }    

            return this.create(newUser);
        })
        .then(userCreated => this.sendConfirmationEmail(userCreated))
        .then(user => user)
} 

function sendConfirmationEmail(user){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    var token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);

    const urlConfirm = `${process.env.APIGATEWAY_URL}/account/confirm/${token}`;
    return transporter.sendMail({
        from: process.env.MAIL_ADMIN_ADDRESS,
        to: user.email,
        subject: "Por favor, confirmar tu email",
        html: `<p>Confirma tu email <a href="${urlConfirm}">Confirmar</a></p>`,
    })
    .then(()=> user);
}

function confirmAccount(token){
    var email = null;
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        email = payload.email;
    } catch (error) {
        throw new Error('token invalido.'); 
    }

    return this.findOne({email})
                .then(user=>{
                    if(!user) throw new Error('Usuario no encontrado');
                    if(user.emailVerified) throw new Error('El usuario ya se encuentra verificado');

                    user.emailVerified = true;
                    return user.save();
                })
}
function login(email, password){
    if(!isValidEmail(email)) throw new Error('Email es invalido.');
    return this.findOne({email})
        .then(user =>{
            if(!user) throw new Error('Credenciales incorrectas.')
            if(!user.emailVerified) throw new Error('El usuario no ha verificado la cuenta email.')

            const isCorrect= bcrypt.compareSync(password, user.password);
            if(!isCorrect) throw new Error('La contraseña es incorrecta.');

            const userObject = {
                _id: user._id,
                email: user.email,
                emailVerified: user.emailVerified,
            }

            const access_token = jwt.sign(Object.assign({}, userObject), process.env.TOKEN_SECRET, {
                expiresIn: 60*60*2,
            });

            return {
                access_token,
            }
        })
}

function findUserById(_id){
    return this.findById(_id)
            .then(user => {
                return {
                        _id: user._id,
                        email: user.email,
                        emailVerified: user.emailVerified,
                    }
                }
            )
}
