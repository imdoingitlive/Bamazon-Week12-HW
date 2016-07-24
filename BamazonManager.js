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
})

var viewProducts = function(){
  connection.query('SELECT * FROM `products`', function(err, results, fields){
    for (var i=0; i < results.length; i++){
      console.log("\nItem ID: "+ results[i].ItemID +"\nName: "+ results[i].ProductName +"\nPrice: $"+ results[i].Price + "\nStock: "+ results[i].StockQuantity);
    }
  });
}

var viewLow = function(){
  connection.query('SELECT * FROM `products`', function(err, results, fields){
    for (var i=0; i < results.length; i++){
      if(results[i].StockQuantity < 5){
        console.log("\nItems with low inventory:\n  Item ID: "+ results[i].ItemID +"\n  Name: "+ results[i].ProductName +"\n  Price: $"+ results[i].Price + "\n  Stock: "+ results[i].StockQuantity);
      }
    }
    if (i === results.length){
      console.log("Low inventory check complete...");
    }
  });
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
        manage();
        break;
      case "View low inventory":
        viewLow();
        manage();
        break;
      case "Add inventory":
        addInv();
        manage();
        break;
      case "Add new product":
        addProduct();
        manage();
        break;
      case "Exit":
        connection.end();
        break;
    }
  });
}

manage();