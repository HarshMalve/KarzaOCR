const express = require('express');
const router = express.Router({
    caseSensitive: true
});
const karzaMulter = require('../middlewares/karza.fileupload');
const karzaApiController = require('../controllers/karza.api');
router.post('/getKarzaToken', karzaApiController.getKarzaToken);
router.post('/karzaOCR', karzaMulter.uploadFile ,karzaApiController.karzaOCR);
module.exports = router;