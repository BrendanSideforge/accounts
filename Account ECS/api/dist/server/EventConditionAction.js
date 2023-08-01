"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventListenerForActionConidtion = void 0;
function eventListenerForActionConidtion(app, event_condition_actions) {
    for (let i = 0; i < Object.keys(event_condition_actions).length; i++) {
        const emit_name = Object.keys(event_condition_actions)[i];
        const callback = event_condition_actions[emit_name];
        const edited_name = emit_name.split("on_")[1];
        // console.log(edited_name);
        app.on(edited_name, callback);
    }
}
exports.eventListenerForActionConidtion = eventListenerForActionConidtion;
