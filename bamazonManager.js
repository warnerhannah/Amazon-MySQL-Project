// NPM PACKAGES
const mysql = require("mysql");
const inquirer = require("inquirer");

// GLOBAL VARIABLES
let newInv;

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
    displayOptions();
});

function displayOptions(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "action"
        }
    ]).then(function(res){
        switch (res.action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
}

// VIEW PRODUCTS FOR SALE
function viewProducts(){
    var query = connection.query(
        "SELECT item_id, product_name, price, stock_quantity FROM products",
        (err, data) => {
            if (err) throw err;
            console.table(data);
            anythingElse();
        });
};

// LOW INVENTORY
function lowInventory(){
    var query = connection.query(
        "SELECT item_id, product_name, stock_quantity FROM products",
        (err, data) => {
            if (err) throw err;
            let lowInv = data.map(function(items){
                if (items.stock_quantity < 40) {
                    return items
                }
            });
            console.table(lowInv)
            anythingElse();
        });
};

// ADD TO INVENTORY
function addInventory(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item?",
            name: "item"
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "num"
        }
    ]).then(function(res){
        getItem(parseInt(res.num), res.item);
    });
};

function getItem(num, item){
    var query = connection.query(
        "SELECT stock_quantity FROM products WHERE item_id = ?", [item],
        (err, data) => {
            if (err) throw err;
            newInv = num + data[0].stock_quantity;
            updateItem(newInv, item)
        }
    )
}

function updateItem(newInv, item){
    var query = connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newInv, item],
        (err, data) => {
            if (err) throw err;
            console.log(data)
            console.log("Updated Quantity!");            
            anythingElse();
        }
    )
}

// ADD A NEW PRODUCT
function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the item?",
            name: "name"
        },
        {
            type: "input",
            message: "What department is it in?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price?",
            name: "price"
        },
        {
            type: "input",
            message: "What is the quantity?",
            name: "quantity"
        }
    ]).then(function(res){
        addItem(res.name, res.department, parseInt(res.price), parseInt(res.quantity));
    });
};

function addItem(name, department, price, quantity){
    var query = connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", 
            [name, department, price, quantity]
        ,
        (err, data) => {
            if (err) throw err;
            console.log("Item Added!");            
            anythingElse();
        }
    )
}

// START OVER OR END CONNECTION
function anythingElse(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to do anything else?",
            name: "confirm"
        }
    ]).then(function (res) {
        if (res.confirm) {
            displayOptions();
        }
        else {
            connection.end();
        }
    });
}