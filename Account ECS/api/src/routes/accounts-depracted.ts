
import express from "express";
import { expressjwt as jwt, Request as JWTRequest } from "express-jwt";
import * as _jwt from "jsonwebtoken";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

import { configuration_template } from "../template/template";

function generateSecretKey() {

    return crypto.randomBytes(32).toString('hex');

}

function getKeyExpiration() {

    let expiresIn = 84600;

    if (Object.keys(configuration_template).includes("jwt")) {
        if (Object.keys(configuration_template.jwt).includes("expires")) {
            expiresIn = configuration_template.jwt.expires;
        }
    }

    return expiresIn;

}

function getSecretKey() {

    let secret_key = "";

    if (Object.keys(configuration_template).includes("jwt")) {
        if (Object.keys(configuration_template.jwt).includes("secret_key")) {
            secret_key = configuration_template.jwt.secret_key;
        } else {
            secret_key = generateSecretKey();

            configuration_template.jwt.secret_key = secret_key;
        }
    } else {
        secret_key = generateSecretKey();

        configuration_template.jwt = { secret_key: secret_key };
    }

    return secret_key;

}

const router: express.Router = new express.Router();

router.post("/register", async (req: express.Request, res: express.Response, next) => {

    const { email, password } = req.body;
    const token = _jwt.sign({ email: email, password: password}, getSecretKey(), { expiresIn: getKeyExpiration(), algorithm: "HS256" })

    res.json(token);

});

router.post("/login", async (req: express.Request, res: express.Response, next) => {

})

router.post("/logout", async (req: express.Request, res: express.Response, next) => {

});

router.get("/test", (req, res) => {
    res.json({ hi: true })
})

router.get("/data", jwt({ secret: getSecretKey(), algorithms: [ "HS256" ] }), async (req: JWTRequest, res: express.Response, next) => {

    res.json({ status: 2342342 });

})

export = router;
