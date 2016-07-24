var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');

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
  console.log('\nConnected as ID: ' + connection.threadId);
  console.log("\nWelcome to Bamazon Managment!\n")
})

connection.query('SELECT * FROM `products`', function(err, results, fields){
  for (var i=0; i < results.length; i++){
    console.log("Item ID: "+ results[i].ItemID +"\nName: "+ results[i].ProductName +"\nPrice: $"+ results[i].Price + "\nStock: "+ results[i].StockQuantity);
    console.log("----------");
  }
});

var viewProducts = function(){

}

var viewLow = function(){

}

var addInv = function(){

}

var addProduct = function(){
  
}

var manage = function(){
  inquirer.prompt([
  {
    type: 'list',
    message: 'Please select a task...',
    choices: ['View products', 'View low inventory', 'Add inventory', 'Add new product', 'Exit'],
    name: 'choice'
  }]).then(function(user){
    switch(user.choice){
      case "View products":
        viewProducts();
        break;
      case "View low inventory":
        viewLow();
        break;
      case "Add inventory":
        addInv();
        break;
      case "Add new product":
        addProduct();
        break;
      case "Exit":
        connection.end();
        break;
    }
  });
}

manage();