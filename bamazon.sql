DROP DATABASE IF EXISTS productsDB;
CREATE database productsDB;

USE productsDB;

CREATE TABLE products (
  item_id INT(50) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(8,2),
  stock_quantity INT(50),
  PRIMARY KEY (item_id)
);

SELECT*FROM products;

-- MOCK DATA -- 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chips", "Food", 2.50, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Charger", "Electronics", 20, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soap", "Toiletries", 6, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 4, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cereal", "Food", 5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball", "Sports", 2, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Brush", "Toiletries", 5, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water", "Food", 1, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Electronics", 200, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T Shirt", "Clothing", 8, 100);