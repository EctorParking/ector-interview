const mysql = require('mysql2');

export default mysql.createConnection({
  host: 'HOST',
  user: 'USER',
  password: 'PWD',
  database: 'DB',
});
