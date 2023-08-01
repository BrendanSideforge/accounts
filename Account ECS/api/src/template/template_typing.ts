
export type Port = {
    port: number,
    host: string
}

export type DatabaseProvider = "postgresql";
export type DatabaseCredentials = {
    db_password: string,
    db_database: string,
    db_user: string,
    db_port: number,
    db_host: string
}

export type JWTCacheProvider = "redis" | "local";
export type JWTHashingAlgorithm = "HS256" | "RS256";

export type ConfigurationTemplate = {

    /**
     * This will be the name of the database that is created.
     */
    project_name: string,

    server_setup: {
        /**
         * Group of listeners for different servers. The database will be {project_name}-{port}
         */
        listeners: Port[]
    },
    database_template: {
        provider: DatabaseProvider,
        credentials: DatabaseCredentials,
        additional_data?: object
    },
    jwt?: {
        provider?: JWTCacheProvider,
        secret_key?: string,
        public_key?: string,
        expires?: number,
        hashing_algorithm?: JWTHashingAlgorithm,
        provider_credentials?: DatabaseCredentials
    },
    event_condition_action?: {

        on_account_create?: Function,
        on_account_delete?: Function,
        on_account_update?: Function,
        on_account_freeze?: Function,
        on_server_ready?: Function,
        on_route_load_success?: Function,
        on_route_load_failure?: Function,
        on_redis_connect?: Function,
        on_redis_error?: Function

    }

}
