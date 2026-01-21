const usercontact = require('../controller/contact')
const express = require('express');
const router = express.Router();

router.post('/contact', usercontact.createContact);
router.get('/contacts', usercontact.getallcontacts);

router.get('/dummydetails',usercontact.dummydetails)

module.exports = router;