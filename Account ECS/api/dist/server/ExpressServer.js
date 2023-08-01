"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyparser = tslib_1.__importStar(require("body-parser"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = tslib_1.__importDefault(require("connect-redis"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const EventConditionAction_1 = require("./EventConditionAction");
const RouteLoader_1 = require("../utils/RouteLoader");
const Database_1 = require("../utils/Database");
class ExpressServer {
    constructor(listener, event_condition_action) {
        this.app = (0, express_1.default)();
        this.listener_obj = listener;
        this.redis = (0, redis_1.createClient)();
        this.redis.connect();
        this.app.use((0, cors_1.default)({
            origin: "*",
            credentials: true
        }));
        // parse application/json
        this.app.use(bodyparser.json());
        // parse application/x-www-form-urlencoded
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use((0, express_session_1.default)({
            store: new connect_redis_1.default({ client: this.redis, prefix: `myApp-${listener}` }),
            secret: "brendanloveswomen4234234",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
            }
        }));
        (0, RouteLoader_1.RouteLoader)(this.app);
        (0, EventConditionAction_1.eventListenerForActionConidtion)(this.app, event_condition_action);
        this.redis.on("error", (err) => {
            this.app.emit("redis_error", err);
        });
        this.redis.on("connect", () => {
            this.app.emit("redis_connect");
        });
        this.app.listen(this.listener_obj.port, this.listener_obj.host, async () => {
            await (0, Database_1.createTables)();
            this.app.emit("server_ready", this.listener_obj);
        });
    }
}
exports.default = ExpressServer;
