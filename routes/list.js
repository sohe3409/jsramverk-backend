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
    res.status(200).send();
});

router.get("/:id", async function (req, res) {
    let result = await server.getDoc(req.params.id);

    const data = {
        data: result,
    };

    console.log(data);
    res.json(data);
    res.status(200).send();
});


module.exports = router;
