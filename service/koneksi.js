var mysql = require('mysql');

//make a connection db

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biodiversity'
});

conn.connect((err)=>{
    if(err)throw err;
    console.log("connection success");
});

module.exports = conn;