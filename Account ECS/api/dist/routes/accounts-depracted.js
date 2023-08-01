"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const _jwt = tslib_1.__importStar(require("jsonwebtoken"));
const crypto = tslib_1.__importStar(require("crypto"));
const template_1 = require("../template/template");
function generateSecretKey() {
    return crypto.randomBytes(32).toString('hex');
}
function getKeyExpiration() {
    let expiresIn = 84600;
    if (Object.keys(template_1.configuration_template).includes("jwt")) {
        if (Object.keys(template_1.configuration_template.jwt).includes("expires")) {
            expiresIn = template_1.configuration_template.jwt.expires;
        }
    }
    return expiresIn;
}
function getSecretKey() {
    let secret_key = "";
    if (Object.keys(template_1.configuration_template).includes("jwt")) {
        if (Object.keys(template_1.configuration_template.jwt).includes("secret_key")) {
            secret_key = template_1.configuration_template.jwt.secret_key;
        }
        else {
            secret_key = generateSecretKey();
            template_1.configuration_template.jwt.secret_key = secret_key;
        }
    }
    else {
        secret_key = generateSecretKey();
        template_1.configuration_template.jwt = { secret_key: secret_key };
    }
    return secret_key;
}
const router = new express_1.default.Router();
router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    const token = _jwt.sign({ email: email, password: password }, getSecretKey(), { expiresIn: getKeyExpiration(), algorithm: "HS256" });
    res.json(token);
});
router.post("/login", async (req, res, next) => {
});
router.post("/logout", async (req, res, next) => {
});
router.get("/test", (req, res) => {
    res.json({ hi: true });
});
router.get("/data", (0, express_jwt_1.expressjwt)({ secret: getSecretKey(), algorithms: ["HS256"] }), async (req, res, next) => {
    res.json({ status: 2342342 });
});
module.exports = router;
