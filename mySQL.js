const mysql = require('mysql2')

async function main(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Password',
        database: 'test'
      }).promise();
      /*const connection = mysql.createConnection({
        host: 'ubuntu-s-1vcpu-2gb-nyc1-01',
        user: 'ethan',
        password: 'testing12',
        database: 'survey_project_1'
      });*/
    //connection.connect();
    var [results] = await connection.query("SELECT * FROM Person");
    console.log(results);
}
main();
