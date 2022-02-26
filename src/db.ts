import { Pool } from 'pg';

const connectionString = "postgres://hndrmftk:p_fRGut0PgjewipJK0HQJ78H5qd7IAeC@kesavan.db.elephantsql.com/hndrmftk";
const db = new Pool({ connectionString });

export default db;
