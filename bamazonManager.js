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

//main menu
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
          if (err) throw err;
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
          if (err) throw err;
          else {
            // console.log("Items with less than 10 in stock:");
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
                //return to main menu
                manageStock();
            }); 
    }//viewLowInventory ends

    function addInventory(){
        inquirer
        .prompt([
        {
          name: "addItem",
          type: "input",
          message: "Which item do you want to add?"
        },
        {
          name: "totalQty",
          type: "input",
          message: "Enter total quantity after this addition:"
        }]
    )
    .then(function(answer) {
    connection.query(" UPDATE products SET ? WHERE ? ",
                [{
                  stock_quantity: answer.totalQty,
                },
                {
                  item_id: answer.addItem 
                }],
                function(err, res) {
                if (err) throw err;
                  else {  
                  // console.log(res);
                  console.log(res.affectedRows + " products updated!\n");
                  console.log("-----------------------------------------------------------------------------------");
                }//else
                //return to main menu
                manageStock();
            });
        });
    }//addInventory ends


    function addNewProduct(){
        inquirer
        .prompt([
        {
          name: "addProduct",
          type: "input",
          message: "Enter product:"
        },
        {
          name: "addDept",
          type: "input",
          message: "Enter department:"
        },
        {
          name: "addQty",
          type: "input",
          message: "Enter quantity:"
        },
        {
        name: "addPrice",
        type: "input",
        message: "Enter unit price:"
        }]
    )
    .then(function(answer) {
    connection.query(" INSERT INTO products SET ?  ",
                {
                  product_name: answer.addProduct,
                  department_name: answer.addDept,
                  stock_quantity: answer.addQty,
                  price: answer.addPrice 
                },
                function(err, res) {
                if (err) throw err;
                  else {  
                  console.log(res);
                  console.log(res.affectedRows + " products updated!\n");
                  console.log("-----------------------------------------------------------------------------------");
                }//else
                //return to main menu
                manageStock();
            });
        });
    }