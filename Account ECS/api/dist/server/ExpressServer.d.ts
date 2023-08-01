import { Port } from "../template/template_typing";
export default class ExpressServer {
    private app;
    private listener_obj;
    private redis;
    constructor(listener: Port, event_condition_action: object);
}
