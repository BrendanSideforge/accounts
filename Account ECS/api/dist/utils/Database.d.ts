export declare function createTables(): Promise<void>;
export declare function createAccount(username: string, email: string, password: string, additional_information: object): Promise<void>;
export declare function getAccount(email: string): Promise<any>;
export declare function isAccountValid(email: any, password: any): Promise<any>;
