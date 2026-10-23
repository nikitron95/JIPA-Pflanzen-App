import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'pflanzen_db'
});

export default pool;