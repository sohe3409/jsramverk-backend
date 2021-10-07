var express = require("express");
var router = express.Router();
const server = require("../src/server.js");
const auth = require("../src/auth.js");

router.put("/:id",
    (req, res) => server.createDoc(req.params.id, req.body)
);

module.exports = router;
