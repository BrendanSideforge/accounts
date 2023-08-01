
import express from "express";

export function eventListenerForActionConidtion(
    app: express.Application,
    event_condition_actions: object 
) {

    for (let i = 0; i < Object.keys(event_condition_actions).length; i++) {

        const emit_name: string = Object.keys(event_condition_actions)[i];
        const callback: Function = event_condition_actions[emit_name];
        const edited_name: string = emit_name.split("on_")[1];

        // console.log(edited_name);

        app.on(edited_name, callback)

    }

}
