const express = require('express');
const todoController = require("../controllers/todoController");
const { isAuthenticated} = require('../middlewares');

const router = express.Router();

router.post('/', isAuthenticated , todoController.create);
router.get('/', isAuthenticated , todoController.getTodosExchange);
router.get('/:id', isAuthenticated , todoController.getTodoExchange);
router.delete('/:id', isAuthenticated , todoController.deleteTodoExchange);

module.exports = router;