var express = require("express");
var router = express.Router();
const server = require("../src/server.js");


router.post("/", async function (req, res, next) {
    await server.createDoc(req.body);
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created",
        },
    });
});
module.exports = router;
