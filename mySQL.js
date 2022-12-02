const mysql = require('mysql2')
const uuid = require('uuid');

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
  
  //var d = new Date();
  //var int = new Date((new Date()).getTime() - ((new Date).getTimezoneOffset() * 60 * 1000));
  //console.log(d.valueOf() + "\n" + int.valueOf());
  //console.log(uuid.v1());

  //await connection.query("INSERT INTO Person (PersonID, Name) VALUES (?, (?));", int);
  try
  {
    await connection.query("DELETE FROM Users WHERE firstName = 'Caitlin';");
  }
  catch(e)
  {
    console.log(e);
  }
  var type = 1;
  var sql = 'SELECT * FROM '
        //type 1 or 2 question
        if(type == 1)
            sql += "Type1_answers WHERE userID = ?"
        else if(type == 2)
            sql += "Type2_answers WHERE userID = ?"
  //var [results] = await connection.query(sql, ["b0c79de6-6a27-11ed-91a4-62bd4a1ad21b"])
  //var obj = {userName: "Tarova"}
  var [results] = await connection.query("SELECT * FROM Users;")
  //var inp = ["'kaeden' OR Name = 'carl';"];
  //var [results] = await connection.query("SELECT * FROM new WHERE Name = ?", inp);
  console.log(results);
  connection.end()
}
main();
