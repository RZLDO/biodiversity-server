const express = require('express');
const auth = require('./auth');
const verivication = require('./verifikasi');
const router = express.Router();

router.post('/api/vl/register', auth.registrasi);
router.post('/api/vl/login', auth.login);

//alamat yang di otorisasi
router.get('/api/vl/rahasia',verivication(),auth.halamanrahasia);


module.exports = router;