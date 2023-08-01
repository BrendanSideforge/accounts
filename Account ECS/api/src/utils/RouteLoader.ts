
import express from "express";
import * as fs from "fs";

/**
 * Loads static exports from the "routes" folder
 * @param app express.Application
 */

export function RouteLoader(app: express.Application): void {

    fs.readdir("./dist/routes", async (err: any, filenames: Array<string>) => {
        if (err) return console.error(`[ROUTE INIT] ${err}`);

        filenames.forEach(async (filename: string) => {
            
            if (!filename.endsWith(".js")) return;
            const filename_without_suffix = filename.split(".js")[0];
            const route_string: string = `/${filename_without_suffix}`;

            try {
                const default_export: any = await (await import(`../routes/${filename}`)).default;
                app.use(route_string, default_export);

                // let routes = [];
                // for (let i: number = 0; i < default_export.stack.length; i++) {
                //     console.log(default_export.stack[i]);
                // }

                app.emit("route_load_success", { name: route_string })
            } catch(e) {
                app.emit("route_load_failure", { name: route_string, error: e });
            }

        });
    })

}
