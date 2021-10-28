var express = require('express');
var router = express.Router();
const auth = require("../src/auth.js");
const server = require("../src/server.js");

router.post('/login',
    (req, res) => auth.login(res, req)
);

router.post('/register', async (req, res, next) => {
    await auth.register(res, req)
    await server.newUser(req.body.email);
});

module.exports = router;
