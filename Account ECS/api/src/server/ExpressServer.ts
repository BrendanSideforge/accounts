
import express from "express";
import * as bodyparser from "body-parser"
import session from 'express-session';
import {createClient} from "redis"
import RedisStore from "connect-redis"
import cors from "cors";

import { Port } from "../template/template_typing";
import { eventListenerForActionConidtion } from "./EventConditionAction";
import { RouteLoader } from "../utils/RouteLoader";
import { generateSecureKey } from "../utils/Crypto";
import { configuration_template } from "../template/template";
import { createTables } from "../utils/Database";

export default class ExpressServer {

    private app: express.Application;
    private listener_obj: Port;
    private redis;

    constructor(listener: Port, event_condition_action: object) {

        this.app = express();
        this.listener_obj = listener;
        this.redis = createClient();
        this.redis.connect();

        this.app.use(cors({
            origin: "*",
            credentials: true
        }));
        // parse application/json
        this.app.use(bodyparser.json());
        // parse application/x-www-form-urlencoded
        this.app.use(bodyparser.urlencoded({ extended: false }));

        this.app.use(
            session({
              store: new RedisStore({ client: this.redis, prefix: `myApp-${listener}` }),
              secret: "brendanloveswomen4234234", // Replace with a strong secret key, must be same as the last time the app was run for the sessions to persist
              resave: false,
              saveUninitialized: false,
              cookie: {
                httpOnly: false,
                secure: false, // Set to true if you are using HTTPS
                maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
              }
            })
          );

        RouteLoader(this.app);
        eventListenerForActionConidtion(this.app, event_condition_action);

        this.redis.on("error", (err) => {
            this.app.emit("redis_error", err);
        });

        this.redis.on("connect", () => {
            this.app.emit("redis_connect");
        });

        this.app.listen(this.listener_obj.port, this.listener_obj.host, async () => {

            await createTables();
            this.app.emit("server_ready", this.listener_obj);
        });


    }

}
