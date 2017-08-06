var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  else runOrder();
});

function runOrder() {
    //retrieve items
    var query = "SELECT * FROM products";
      connection.query(query, function(err, res) {
          if (err){
              throw err;
            } 
          //display items  
          else {
            for (var i = 0; i < res.length; i++) {
            // console.log(res[i]);
            console.log(
                "ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Unit Price: $ " +
                res[i].price
            )}
          }
          // place order
          placeOrder();
        });
    }

//global variables to hold item and qty for each cycle of order
var purchaseItem = "";
var purchaseQty = "";

function placeOrder(){
//prompt items and qty to purchase
  inquirer
    .prompt([
    { name: "choice",
      type: "input",
      message: "Enter item number to purchase:"
    },{
      name: "qty",
      type: "input",
      message: "Enter number of item to purchase:"
    }
    ])
    .then(function(answer) {
      //capture order item and qty
        purchaseItem = answer.choice;
        purchaseQty = answer.qty;

        //check stock by item id
        connection.query("SELECT * FROM products where ?", 
        {item_id: purchaseItem}, function(err, res) {
          if (err){
            throw err;
          } 
          for (var i = 0; i < res.length; i++) {
          //if stock empty, show stock-out message
          if (res[i].stock_quantity < answer.qty){
            console.log("Sorry, the stock for this item has been depleted. Please order another item.");
            console.log("-----------------------------------------------------------------------------------");
            placeOrder();
          }
          else {
            //if stock available, print order
            // console.log(res);
            console.log(
                "Ordered: ID: " +
                res[i].item_id +
                " \n Item: " +
                res[i].product_name +
                " \n Unit price: $" +
                res[i].price +
                " \n Quantity bought: " +
                purchaseQty +
                " \n Total price: $" +
                res[i].price*purchaseQty
             )
              //update db - subtract order qty from stock_qty
              connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: res[i].stock_quantity - purchaseQty
                },
                {
                  item_id: res[i].item_id
                }
              ],
              function(error) {
              if (error) throw err;
              console.log('Thank you for your order.');
              console.log("-----------------------------------------------------------------------------------");
              }
            );
          }
        }
      });
    });
    }//placeOrder ends