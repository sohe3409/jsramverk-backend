var express = require("express");
var router = express.Router();
const server = require("../src/server.js");



router.put("/:id", async function (req, res, next) {
    await server.updateDoc(req.params.id, req.body);
    res.status(204).json({
        data: {
            msg: "Got a PUT request, sending back 204 Updated",
        },
    });
});

module.exports = router;
