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
  });

connection.connect(function(err){
  if(err) throw err;
});

var viewProducts = function(){
  connection.query('SELECT * FROM `products`', function(err, results, fields){
    for (var i=0; i < results.length; i++){
      console.log("\nItem ID: "+ results[i].ItemID +"\nName: "+ results[i].ProductName +"\nPrice: $"+ results[i].Price + "\nStock: "+ results[i].StockQuantity);
    }
    if (i === results.length){
      console.log("");
      manage();
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
      console.log("Low inventory check complete...\n");
      manage();
    }
  });
}

var addInv = function(){
  prompt.message = "";
  
  prompt.start();

  prompt.get(
  {
    properties: {
      itemNum: {
        description: '\nWhich item would you like to add more of',
        type: 'integer',
        required: true
      },
      quantity: {
        description: 'Total to add to inventory',
        type: 'integer',
        required: true
      }
    }
  }, function(err, results){
    connection.query('SELECT * FROM `products` WHERE ItemID=?',[results.itemNum], function(err, result, fields){
      
      connection.query('UPDATE `products` SET StockQuantity=? WHERE ItemID=?', [(result[0].StockQuantity + results.quantity),results.itemNum], function(){

      });
    
    });

    connection.query('SELECT * FROM `products` WHERE ItemID=?',[results.itemNum],function(err, result, fields){
      console.log("Total inventory for "+result[0].ProductName+" now "+(result[0].StockQuantity + results.quantity)+" units...");
    
      if((result[0].StockQuantity + results.quantity) > result[0].StockQuantity){
        console.log("");
        manage();

      }
    })

  });

}

var addProduct = function(){
  console.log("\nPlease enter the following information for the new item...");
  inquirer.prompt([
  {
    name: "ProductName",
    message: "Product Name: ",
  }, {
    name: "DepartmentName",
    message: "Department Name: "
  }, {
    name: "Price",
    message: "Item Price: "
  }, {
    name: "StockQuantity",
    message: "Total Inventory: "
  }]).then(function(user){
    connection.query('INSERT INTO `products` (ProductName, DepartmentName, Price, StockQuantity) VALUES (?,?,?,?)',[user.ProductName, user.DepartmentName, user.Price, user.StockQuantity], function(err){
      if (!err){
        console.log("Item added!\n");
        manage();
      }
    })
  })
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