const express = require('express')
const StoreController = require('../controllers/store-controller')
const router = express.Router()
const auth = require('../auth')
const multer = require('multer');

const upload = multer({ dest: 'images/'});

router.post('/new_card', auth.verify, upload.single('image'), StoreController.newCard);
router.get('/load_cards', StoreController.loadCards);
router.put('/update_card', StoreController.updateCard);
router.delete('/delete_card/:id', auth.verify, StoreController.deleteCard);
module.exports = router