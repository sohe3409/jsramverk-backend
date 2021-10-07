
var express = require('express');
var router = express.Router();
const auth = require("../src/auth.js");

router.post('/login',
    (req, res) => auth.login(res, req)
);



router.post('/register',
    (req, res) => auth.register(res, req)
);

// router.get('/users',
//     (req, res, next) => auth.checkToken(req, res, next),
//     (req, res) => auth.allUsers(res, req)
// );

module.exports = router;
