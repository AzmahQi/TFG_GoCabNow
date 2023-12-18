

// db.js
import mysql from 'serverless-mysql';

export const pool = mysql({
  config: {
    host: 'tfg',
    user: 'root',
    password: 'nextjs',
    database: 'gocabnow',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
});

