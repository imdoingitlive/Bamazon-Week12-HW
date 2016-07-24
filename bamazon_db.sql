CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  ItemID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) NULL,
  DepartmentName VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  StockQuantity INT NULL,
  PRIMARY KEY(ItemID)
);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Mechanical Keyboard", "Computer Peripherals", 35.95, 100);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Mouse", "Computer Peripherals", 25.95, 100);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Nvidia GTX 1080", "Computer Parts", 699.95, 50);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Nvidia GTX 1070", "Computer Parts", 299.95, 75);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("ASUS G-Sync Monitor", "Computer Peripherals", 749.95, 35);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Overwatch", "Computer Games", 59.99, 40);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Counter-Strike: Global Offensive", "Computer Games", 24.99, 40);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Sonic-06", "Computer Games", 4.99, 1000);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Rolercoaster Tycoon 2", "Computer Games", 7.99, 500);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Minecraft", "Computer Games", 89.99, 1);