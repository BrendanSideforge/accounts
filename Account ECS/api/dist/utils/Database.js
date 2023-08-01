"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountValid = exports.getAccount = exports.createAccount = exports.createTables = void 0;
const tslib_1 = require("tslib");
const template_1 = require("../template/template");
const pg = tslib_1.__importStar(require("pg"));
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const pool = new pg.Pool(template_1.configuration_template.database_template.credentials);
async function createTables() {
    const table_name = `accounts`;
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
exports.createTables = createTables;
async function createAccount(username, email, password, additional_information) {
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);
    const query = `
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
exports.createAccount = createAccount;
async function getAccount(email) {
    const rows = await pool.query(`SELECT * FROM accounts WHERE email=$1`, [email]);
    console.log(rows.rows);
    return rows.rows.length > 0 ? rows.rows[0] : null;
}
exports.getAccount = getAccount;
// export async function updateAccount(email: string, payload) {
//     const account = await getAccount(email);
//     if (!account) {
//         return null;
//     }
//     const payload_updaters = Object.keys(payload);
// }
async function isAccountValid(email, password) {
    const account = await getAccount(email);
    if (!account) {
        return false;
    }
    const validPassword = await bcrypt.compare(password, account.password);
    console.log(password, account.password);
    return validPassword;
}
exports.isAccountValid = isAccountValid;
