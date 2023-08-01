"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = new express_1.default.Router();
router.get("/", (req, res) => {
    // console.log("hi");
    res.json({
        status: 200,
        text: "hello world!"
    });
});
module.exports = router;
