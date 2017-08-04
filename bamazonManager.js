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
  else manageStock();
});

function manageStock(){
    inquirer
        .prompt({
        name: "option",
        type: "list",
        message: "Select Option:",
        choices: [
            "View Products for Sale",
            "View Low Inventory (less than 11)",
            "Add to Inventory",
            "Add New Product"
        ]
        })
        .then(function(answer) {
        switch (answer.option) {
            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory (less than 11)":
            viewLowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addNewProduct();
            break;
        }
        });
    }//manageStock ends

    function viewProducts(){
        var query = "SELECT * FROM products";
        connection.query(query, function(err, res) {
          if (err){
              throw err;
            } 
          
          else {
            for (var i = 0; i < res.length; i++) {
            // console.log(res[i]);
            console.log(
                "ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Department: " +
                res[i].department_name +
                " || Unit Price: $ " +
                res[i].price +
                " || Stock Quantity: " +
                res[i].stock_quantity
            )}
             console.log("-----------------------------------------------------------------------------------");
          }
          //return to main menu
          manageStock();
        });
    }//viewProducts ends


    function viewLowInventory(){
        var query = " SELECT * from products WHERE stock_quantity<=10 ";
        connection.query(query, function(err, res) {
          if (err)throw err;
          else {
            //   console.log("Items with less than 10 in stock:");
                for (var i = 0; i < res.length; i++) {
                console.log(
                "\n" + "ID: " +
                res[i].item_id +
                " || Item: " +
                res[i].product_name +
                " || Department: " +
                res[i].department_name +
                " || Unit Price: $ " +
                res[i].price +
                " || Stock Quantity: " +
                res[i].stock_quantity
                )}//log & for
                console.log("-----------------------------------------------------------------------------------");
              }//else
                manageStock();
            });//query, function (error)
    }//viewLowInventory ends

    // function addInventory(){
        
    // }

    // function addNewProducts(){
        
    // }