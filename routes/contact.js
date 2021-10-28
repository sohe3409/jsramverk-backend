var express = require("express");
var mailgun = require("mailgun-js");
var router = express.Router();
const config = require("../db/config.json");
const mg = mailgun({apiKey: config.api_key, domain: config.domain});


router.post("/", async (req, res, next) => {
    await mg.messages().send(req.body.body, function (error, body) {
        console.log(req.body.body)
      	console.log(body);
    });
});

module.exports = router;
