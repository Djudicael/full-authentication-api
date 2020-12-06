import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
import pg from 'pg';
// import { DB, DB_HOST, DB_USER_PASSWORD, DB_USER ,DB_PORT} from '../config/config.js';
// console.log(DB_USER);
// console.log(DB);

const Pool = pg.Pool;
const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "accounts",
    password: "postgres",
    port: 5432,
});



export default pool;