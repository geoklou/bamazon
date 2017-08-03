DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2)  NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("mastering full stack development", "Books", 20.20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Essay and report writing skills", "Books", 44.80, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Minecraft: Pocket Edition", "Apps and Games", 6.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Amazing Spider-Man 2", "Apps and Games", 6.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Crock-Pot 6-Quart Programmable Cooker", "Appliances", 35.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Villain SPA - Ultrasonic Aroma Essential Oil Diffuser", "Appliances", 34.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lenovo Flex 5 15.6-Inch 2-in-1 Laptop", "Computers", 779.25, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("NETGEAR Nighthawk X6S AC4000 Tri-band Gigabit WiFi Router", "Computers", 299.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Hamster Animal", "Fine Art Photographs", 101.90, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Blue Bubbles", "Fine Art Photographs", 41.90, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Summer Infant 3Dlite Convenience Stroller", "Baby", 56.64, 0);
