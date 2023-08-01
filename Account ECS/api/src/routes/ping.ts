
import express from "express";

const router: express.Router = new express.Router();

router.get("/", (req: express.Request, res: express.Response) => {

    // console.log("hi");
    res.json({
        status: 200,
        text: "hello world!"
    })

})

export = router;
