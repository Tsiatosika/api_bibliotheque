const router = require('express').Router();
const ctrl   = require('../controllers/borrowController');
const auth   = require('../middlewares/auth');

router.get('/',              auth, ctrl.index);
router.post('/',             auth, ctrl.store);
router.patch('/:id/return',  auth, ctrl.returnBook);
module.exports = router;