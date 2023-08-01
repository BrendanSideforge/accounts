
import { configuration_template } from "../template/template";
import * as pg from "pg";
import * as bcrypt from "bcrypt";

const pool: pg.Pool = new pg.Pool(configuration_template.database_template.credentials);

export async function createTables() {

    const table_name: string = `accounts`;

    await pool.query(`
        CREATE TABLE IF NOT EXISTS ${table_name} (

            id SERIAL PRIMARY KEY,
            username TEXT,
            email TEXT,
            password TEXT,
            additional_information JSONB

        )
    `);

}

export async function createAccount(username: string, email: string, password: string, additional_information: object) {

    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);

    const query: string = `
    INSERT INTO accounts (

        username, 
        email,
        password,
        additional_information

    ) VALUES (
        $1, $2, $3, $4
    )
    `;
    await pool.query(query, [username, email, hash, additional_information]);

}

export async function getAccount(email: string) {

    const rows = await pool.query(`SELECT * FROM accounts WHERE email=$1`, [ email ]);

    console.log(rows.rows);
    return rows.rows.length > 0 ? rows.rows[0] : null;

}

// export async function updateAccount(email: string, payload) {

//     const account = await getAccount(email);

//     if (!account) {
//         return null;
//     }

//     const payload_updaters = Object.keys(payload);

// }

export async function isAccountValid(email, password) {

    const account = await getAccount(email);

    if (!account) {
        return false
    }

    const validPassword = await bcrypt.compare(password, account.password);
    console.log(password, account.password);
    return validPassword;

}
