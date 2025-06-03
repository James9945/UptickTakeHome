const express = require('express');
const controller = require('../Controllers/BookController');
const {authentication, authorization} = require('../MiddleWare/AuthMiddleware');

const router = express.Router();

// Public access (optional to protect)
router.get('/', controller.getAllBook);
router.get('/:id', controller.getOneBook);

// Only authenticated users can create, update, or delete
router.post('/', authentication, authorization(['admin', 'manager']), controller.CreateBook);
router.put('/:id', authentication, authorization(['admin', 'manager']), controller.UpdateOneBook);
router.delete('/:id', authentication, authorization(['admin']), controller.DeleteBook);

module.exports = router;