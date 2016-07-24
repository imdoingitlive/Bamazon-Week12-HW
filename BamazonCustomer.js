var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.
  createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 't3st3r',
    database: 'bamazon_db'
  })
  
connection.connect(function(err){
  if(err) throw err;
  console.log('Connected as ID: ' + connection.threadId);
  console.log("\nWelcome to Bamazon! Today's hot items are...\n")
})

connection.query('SELECT * FROM `products`', function(err, results, fields){
  for (var i=0; i < results.length; i++){
    console.log(results[i].ItemID +" "+ results[i].ProductName +" $"+ results[i].Price);
    console.log("----------");
  }
});

