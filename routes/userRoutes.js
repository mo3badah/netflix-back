const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, getOwnData, createUser, updateUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', authenticateUser, authorizeUser(['admin']), getAllUsers);
router.get('/:id', authenticateUser, authorizeUser(['admin']), getUserById);
router.get('/own/:id', authenticateUser, authorizeUser(['admin','user']), getOwnData);
router.post('/', authenticateUser, authorizeUser(['admin']), createUser);
router.put('/:id', authenticateUser, authorizeUser(['admin']), updateUser);
router.patch('/role/:id', authenticateUser, authorizeUser(['admin']), updateUserRole);
router.delete('/:id', authenticateUser, authorizeUser(['admin']), deleteUser);

module.exports = router;