"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const Sessions_1 = require("../utils/Sessions");
const Database_1 = require("../utils/Database"); // updateAccount
const router = new express_1.default.Router();
router.get("/ping", (req, res) => {
    res.json({
        status: 200,
        text: "account - hello world!"
    });
});
router.get("/account-data", async (req, res) => {
    const session = req.session;
    console.log(session);
    if (!(0, Sessions_1.sessionIsValid)(session)) {
        return res.json({
            found: false,
            message: "Account not found."
        });
    }
    res.json({
        found: true,
        message: session
    });
});
router.post("/register", async (req, res) => {
    const { email, password, additional_information } = req.body;
    const session = req.session;
    if (!email || !password)
        return res.json({
            registered: false,
            message: "Insufficient credentials provided."
        });
    await (0, Database_1.createAccount)(null, email, password, JSON.parse(additional_information));
    session.email = email;
    session.additional_information = JSON.parse(additional_information);
    res.json({ email, password });
});
// router.put("/update", async (req: express.Request, res: express.Response) => {
//     const { email, new_data } = req.body;
//     const account = await getAccount(email);
//     if (!account || !sessionIsValid(req.session)) {
//         return res.json({
//             updated: false,
//             message: "Account does not exist."
//         });
//     }
//     const updated = await updateAccount(email, new_data);
//     if (!updated) {
//         return res.json({
//             updated: false,
//             message: "Account not found, or no data to update."
//         });
//     }
//     return res.json({
//         updated: true,
//         payload: new_data
//     });
// });
router.post("/login", async (req, res) => {
    const session = req.session;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            logged_in: false,
            message: "Insufficient credentials provided."
        });
    }
    if (!(0, Database_1.isAccountValid)(email, password)) {
        return res.json({
            logged_in: false,
            message: "Credentials are not matched."
        });
    }
    const account = await (0, Database_1.getAccount)(email);
    if (!account) {
        return res.json({
            logged_in: false,
            message: "Account does not exist."
        });
    }
    session.email = email;
    session.additional_information = account.additional_information;
    res.json({
        logged_in: true,
        message: session
    });
});
router.post("/logout", async (req, res) => {
    const session = req.session;
    if (!(0, Sessions_1.sessionIsValid)(session)) {
        return res.json({
            logged_out: false,
            message: "User was not orginally logged in."
        });
    }
    session.destroy();
    res.json({
        logged_out: true
    });
});
module.exports = router;
