"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteLoader = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
/**
 * Loads static exports from the "routes" folder
 * @param app express.Application
 */
function RouteLoader(app) {
    fs.readdir("./dist/routes", async (err, filenames) => {
        if (err)
            return console.error(`[ROUTE INIT] ${err}`);
        filenames.forEach(async (filename) => {
            if (!filename.endsWith(".js"))
                return;
            const filename_without_suffix = filename.split(".js")[0];
            const route_string = `/api/${filename_without_suffix}`;
            try {
                const default_export = await (await Promise.resolve(`${`../routes/${filename}`}`).then(s => tslib_1.__importStar(require(s)))).default;
                app.use(route_string, default_export);
                // let routes = [];
                // for (let i: number = 0; i < default_export.stack.length; i++) {
                //     console.log(default_export.stack[i]);
                // }
                app.emit("route_load_success", { name: route_string });
            }
            catch (e) {
                app.emit("route_load_success", { name: route_string, error: e });
            }
        });
    });
}
exports.RouteLoader = RouteLoader;
