const mysql = require('mysql2')

async function main(){
  /*const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Password',
        database: 'test'
      }).promise();*/
  const connection = mysql.createConnection({
    host: "161.35.126.112",
    user: "universal",
    password: "password",
    database: "survey_project_1",
  })
  .promise();
  var obj = {userName: "Tarova"}
  var [results] = await connection.query("SELECT * FROM Questions")
  //var [results] = await connection.query("INSERT INTO Users (firstName, lastName, userName, email, userID, password) VALUES ('Kaeden', 'Le', 'kaedenle', 'kaedenle@gmail.com', 'b0c79de6-6a27-11ed-91a4-62bd4a1ad21c', 'password');");
  console.log(results);
  connection.end()
}
main();
