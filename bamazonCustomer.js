// NPM PACKAGES
const mysql = require("mysql");
const inquirer = require("inquirer");

// GLOBAL VARIABLES
let num;
let item;
let stock;
let price;

// MYSQL CONNECTION
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "1Hannahhaw",
    database: "productsDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems();
});

// DISPLAY AVAILABLE ITEMS
function displayItems() {
    var query = connection.query(
        "SELECT item_id, product_name, price FROM products",
        (err, data) => {
            if (err) throw err;
            console.table(data);
            purchaseItem();
        });
}

// ASK QUESTIONS TO BEGIN A PURCHASE
function purchaseItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you would like to purchase?",
            name: "item"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "num"
        }
    ]).then(function (res) {
        item = res.item;
        num = res.num;

        var query = connection.query(
            "SELECT * FROM products WHERE ?", { item_id: item },
            (err, data) => {
                if (err) throw err;
                stock = data[0].stock_quantity;
                price = data[0].price;

                if (stock > num) {
                    completeOrder();
                }
                // // IF NOT ENOUGH STOCK, END ORDER
                else {
                    console.log("Sorry, Insufficient Quantity!")
                    startAgain();
                }
            })
    });
}

// IF THERE IS ENOUGH IN STOCK, FINISH ORDER
function completeOrder() {
    let newNum = stock - num;

    var query = connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newNum, item],
        (err, data) => {
            if (err) throw err;
            let total = num * price;
            console.log(`\n\nThanks for your purchase! \nTotal Cost: $${total} \n \n`);            
            startAgain();
        }
    )
}



function startAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to make another purchase?",
            name: "confirm"
        }
    ]).then(function (res) {
        if (res.confirm) {
            displayItems();
        }
        else {
            connection.end();
        }
    });
}