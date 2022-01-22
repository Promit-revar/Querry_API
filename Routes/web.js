const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const OperationController = require('../controllers/OperationController');
router.get('/',AuthController.home);
router.post('/register', AuthController.register);
router.post('/login',AuthController.login);
router.post('/create_record',OperationController.Create);
router.post('/update_record',OperationController.Update);
router.post('/search_record',OperationController.Read);
router.post('/delete_record',OperationController.Delete);

module.exports=router;