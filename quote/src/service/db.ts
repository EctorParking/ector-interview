import mysql from 'mysql2/promise';

const conn = mysql.createConnection({
  host: 'HOST',
  user: 'USER',
  password: 'PWD',
  database: 'DB',
});

/*
* See https://www.npmjs.com/package/mysql2#using-promise-wrapper
*/
export const query = async (sql:string) => (await conn).query(sql);

export default conn;
