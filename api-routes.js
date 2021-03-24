const router = require('express').Router();
const userController = require('./user-controller');

router.get('/', (req,res) => {
    res.send('Hola desde ./api-routes.js');
});

router.route('/users').get(userController.getAll);
router.route('/user/:userId').get(userController.getById);
router.route('/update-user/:userId').put(userController.updateById);
router.route('/delete/:userId').delete(userController.deleteByID);
router.route('/new-user').post(userController.newUser);
router.route('/login').get(userController.login);

module.exports = router;