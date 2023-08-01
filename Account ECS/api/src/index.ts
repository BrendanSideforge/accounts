
import ExpressServer from "./server/ExpressServer";
import { configuration_template } from "./template/template";
import { Port } from "./template/template_typing";

for (let i = 0; i < configuration_template.server_setup.listeners.length; i++) {

    const listener: Port = configuration_template.server_setup.listeners[i];

    new ExpressServer(listener, configuration_template.event_condition_action);

}
