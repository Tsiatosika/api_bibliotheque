const router = require('express').Router();
const ctrl   = require('../controllers/bookController');
const auth   = require('../middlewares/auth');

router.get('/',     ctrl.index);
router.post('/',    auth, ctrl.store);
router.get('/:id',  ctrl.show);
router.put('/:id',  auth, ctrl.update);
router.delete('/:id', auth, ctrl.destroy);
module.exports = router;