const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/authController');
const { authenticateUser, authorizeUser} = require('../middleware/authentication');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/isAdmin', authenticateUser, authorizeUser(['admin','user']), (req, res) => {
    return res.status(200).json({ user: req.user }) ;
});

module.exports = router;