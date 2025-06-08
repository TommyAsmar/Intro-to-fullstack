// src/db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tommy2004.', // your password
  database: 'ts_demo'
});