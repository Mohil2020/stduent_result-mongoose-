var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');

/* GET home page. */
router.post('/school_regi', user.school_regi);
router.post('/school_log', user.school_log);
router.post('/addstd', user.addstd);
router.post('/addstu', user.addstu);
router.post('/addstaff', user.addstaff);
router.get('/viewstu', user.viewstu);
router.get('/viewstd', user.viewstd);
router.get('/viewstaff', user.viewstaff);
router.get('/deletestaff/:id', user.deletestaff);
router.post('/updatestaff/:id', user.updatestaff);
router.get('/allresult', user.allresult);
router.get('/resultstd', user.resultstd);
router.post('/topresult', user.topresult);

router.post('/staff_log', user.staff_log);
router.get('/staffstu', user.staffstu);
router.post('/addresult', user.addresult);
router.get('/viewresult', user.viewresult);
router.get('/resultstu/:no', user.resultstu);
router.get('/deleteresult/:id', user.deleteresult);
router.post('/updateresult/:id', user.updateresult);

router.post('/student_log', user.student_log);

module.exports = router;
