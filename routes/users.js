const express = require('express');

const usersController = require('../controller/users');

const router = express.Router();

router.get('/account/:userId', usersController.getUser);

router.get('/api/account/stories/:userId', usersController.getUserStories);

router.get('/account/basic/:userId', usersController.getUserBasic);

router.put('/account/update-username', usersController.updateUsername);

router.put('/account/update-desc', usersController.updateDesc);

router.delete('/account/:userId', usersController.deleteUser);






module.exports = router;
