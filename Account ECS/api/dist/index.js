"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ExpressServer_1 = tslib_1.__importDefault(require("./server/ExpressServer"));
const template_1 = require("./template/template");
for (let i = 0; i < template_1.configuration_template.server_setup.listeners.length; i++) {
    const listener = template_1.configuration_template.server_setup.listeners[i];
    new ExpressServer_1.default(listener, template_1.configuration_template.event_condition_action);
}
