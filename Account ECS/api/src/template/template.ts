
import { type ConfigurationTemplate } from "./template_typing";

export const configuration_template: ConfigurationTemplate = {

    project_name: "viralthumbs",
    server_setup: {

        listeners: [
            {
                port: 3001,
                host: "localhost"
            }
        ]

    },
    database_template: {
        provider: "postgresql",
        credentials: { 
            db_host: "localhost",
            db_port: 5432,
            db_password: "BS103261",
            db_database: "viralthumbs",
            db_user: "postgres"
        },
        additional_data: {}
    },
    event_condition_action: {
        on_server_ready: (e) => {
            console.log(`Listening on the server ${e.host}:${e.port}`)
        },
        on_route_load_failure: (e) => {
            console.log(`[ROUTE FAILURE] ${e.name}: ${e.error}`)
        },
        on_route_load_success: (e) => {
            console.log(`[ROUTE SUCCESS] ${e.name}`);
        },
        on_redis_connect: () => {
            console.log(`[REDIS] Connected successfully.`);
        },
        on_redis_error: (e) => {
            console.log(`[REDIS ERROR] ${e}`)
        }

    }

}