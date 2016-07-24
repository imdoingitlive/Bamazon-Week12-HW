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