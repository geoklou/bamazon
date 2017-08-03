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
                // " || Department: " +
                // res[i].department_name +
                " || Unit Price: $ " +
                res[i].price
            )}
            // placeOrder();
          }
        placeOrder();
        });
    }

//create variables to hold values
//global array to keep multiple orders for each customer
var cart = {item:"", qty:""};
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
        purchaseItem = answer.choice;
        purchaseQty = answer.qty;

        // var query = "SELECT * FROM products where ?", 
        // {item_id: answer.choice},
        connection.query("SELECT * FROM products where ?", 
        {item_id: purchaseItem}, function(err, res) {
          if (err){
            throw err;
          } 
          for (var i = 0; i < res.length; i++) {
          if (res[i].stock_quantity < answer.qty){
            console.log("Sorry, the stock for this item has been depleted. Please order another item.");
            placeOrder();
          }
          else {
            //print order
            console.log(res);
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
            console.log('Thank you for your order.');
          }
            //push purchase into cart
            // cart.push({item:this.purchaseItem, qty: this.purchaseQty});
            // console.log(cart);
            // console.log('Please confirm order.');
            // placeOrder();            
              // updateStock();
            }
      });
    });

    }//placeOrder ends

    //         //show order for user to confirm
        // inquirer
        // .prompt
        // if confirm

        //   displayOrder();

        // 
            
        //   updateStock();
    // }

function updateStock(id, startQty, endQty){

}