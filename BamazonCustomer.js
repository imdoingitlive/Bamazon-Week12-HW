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
  console.log('\nConnected as ID: ' + connection.threadId);
  console.log("\n==================================================\nWelcome to Bamazon! Today's hot items are...\n==================================================")
})

connection.query('SELECT * FROM `products`', function(err, results, fields){
  for (var i=0; i < results.length; i++){
    console.log("Item ID: "+ results[i].ItemID +"\nName: "+ results[i].ProductName +"\nPrice: $"+ results[i].Price);
    console.log("----------");
  }
  if (i === results.length){
    order();
  }
});

var order = function(){

  prompt.message = "";

  prompt.start();

  prompt.get({
    properties: {
      itemNum: {
        description: 'Which item would you like to buy? Enter an ID to select an item',
        type: 'integer',
        required: true
      },
      quantity: {
        description: 'How many would you like to buy',
        type: 'integer',
        required: true
      }
    }
  }, function(err, result){
    
    console.log("You selected Item ID: " + result.itemNum);
    console.log("Quantity: " + result.quantity);

    connection.query('SELECT * FROM `products` WHERE ItemID=?',[result.itemNum],function(err, results, fields){  

      if(result.quantity < results[0].StockQuantity){
        
        connection.query('UPDATE `products` SET StockQuantity=? WHERE ItemID=?',[(results[0].StockQuantity - result.quantity), result.itemNum],function(){

        })

        console.log("Your order total is: " + result.quantity * results[0].Price);
        connection.end();
      }
      else{
        console.log("Insufficient stock! Please retry!");
        order();
      }
    });
  });

}