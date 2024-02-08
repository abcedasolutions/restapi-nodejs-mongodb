const express = require('express');
const userController = require("../controllers/userController");


const router = express.Router();

router.post('/signup', userController.signup);
router.get('/confirm/:token', userController.confirmAccount);

module.exports = router;
