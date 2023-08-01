
import express from "express";
import { sessionIsValid } from "../utils/Sessions";
import { configuration_template } from "../template/template";
import { createAccount, getAccount, isAccountValid } from "../utils/Database"; // updateAccount

const router: express.Router = new express.Router();

router.get("/ping", (req: express.Request, res: express.Response) => {

    res.json({
        status: 200,
        text: "account - hello world!"
    })

});

router.get("/account-data", async ( req: express.Request, res: express.Response ) => {

    const session: express.Session = req.session;

    console.log(session);
    if (!sessionIsValid(session)) {
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

router.post("/register", async ( req: express.Request, res: express.Response ) => {

    const { email, password, additional_information } = req.body;
    const session: express.Session = req.session;

    if (!email || !password) return res.json({
        registered: false,
        message: "Insufficient credentials provided."
    });

    await createAccount(
        null,
        email,
        password,
        JSON.parse(additional_information)
    );

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

router.post("/login", async ( req: express.Request, res: express.Response ) => {

    const session: express.Session = req.session;
    const { email, password } = req.body;

    if (!email || !password) {

        return res.json({
            logged_in: false,
            message: "Insufficient credentials provided."
        });

    }

    if (!isAccountValid(email, password)) {
        return res.json({
            logged_in: false,
            message: "Credentials are not matched."
        });
    }

    const account = await getAccount(email);

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

})

router.post("/logout", async ( req: express.Request, res: express.Response ) => {

    const session: express.Session = req.session;

    if (!sessionIsValid(session)) {
        return res.json({
            logged_out: false,
            message: "User was not orginally logged in."
        })
    }

    session.destroy();

    res.json({
        logged_out: true
    })

})

export = router;
