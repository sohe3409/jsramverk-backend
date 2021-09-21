var express = require("express");
var router = express.Router();
const server = require("../src/server.js");

router.get("/", async function (req, res) {
    let result = await server.getDocs();

    const data = {
        data: result,
    };

    console.log(data);
    res.json(data);

});

module.exports = router;
