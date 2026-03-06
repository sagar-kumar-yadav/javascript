### PostgreSQL
- an advanced relational database system.
- supports both relational (SQL) and non-relational (JSON) queries.
-  free and open-source.
## Create Table
```sql
CREATE TABLE cars (
  brand VARCHAR(255),
  model VARCHAR(255),
  year INT
);
```
- after execution it's return CREATE TABLE
## Insert Into
```sql
INSERT INTO cars (brand, model, year)
VALUES ('Ford', 'Mustang', 1964);
```
- return INSERT 0 1
## Insert Multiple Rows
```sql
INSERT INTO cars (brand, model, year)
VALUES
  ('Volvo', 'p1800', 1968),
  ('BMW', 'M1', 1978),
  ('Toyota', 'Celica', 1975);
```
- return INSERT 0 3
## Select Data
```sql
- SELECT brand, year FROM cars;
- SELECT * FROM cars;
```
## ALTER TABLE Statement
- To add a column to an existing table, we have to use the ALTER TABLE statement.
- The ALTER TABLE statement is used to add, delete, or modify columns in an existing table.
- The ALTER TABLE statement is also used to add and drop various constraints on an existing table.
```sql
-- We want to add a column named color to our cars table.
ALTER TABLE cars
ADD color VARCHAR(255);
```
## UPDATE
- update used to modify existing table values
```sql
UPDATE cars
SET color = 'red'
WHERE brand = 'Volvo';
-- Without the WHERE clause, ALL records will be updated:
UPDATE cars
SET color = 'white', year = 1970
WHERE brand = 'Toyota';
```
## ALTER COLUMN
```sql
-- we want to change the data type of the year column of the cars table from INT to VARCHAR(4).
ALTER TABLE cars
ALTER COLUMN year TYPE VARCHAR(4);
```
## DROP COLUMN
```sql
-- To remove a column from a table, we have to use the ALTER TABLE statement.
ALTER TABLE cars
DROP COLUMN color;
```
## DELETE
```sql
-- DELETE statement is used to delete existing records in a table.
DELETE FROM cars
WHERE brand = 'Volvo';
```
## TRUNCATE TABLE
```sql
-- for deleting all records for the table
TRUNCATE TABLE cars;
```
## DROP TABLE
```sql
-- The DROP TABLE statement is used to drop an existing table in a database.
-- databse table has also been delete
DROP tabel cars
```
## LIKE
```sql
-- Return all records where the model STARTS with a capital 'M':
SELECT * FROM cars
WHERE model LIKE 'M%';
```
## where
- WHERE clause is used to filter records.
## Sort Data
- ORDER BY keyword is used to sort the result in ascending or descending order.
```sql
SELECT * FROM products
ORDER BY price;

-- For string values the ORDER BY keyword will order alphabetically:
SELECT * FROM products
ORDER BY product_name;
```
## LIMIT
- The LIMIT clause is used to limit the maximum number of records to return.
```sql
-- Return only the 20 first records from the customers table:
SELECT * FROM customers
LIMIT 20;
```
## The OFFSET Clause
- The OFFSET clause is used to specify where to start selecting the records to return.
```sql
SELECT * FROM customers
LIMIT 20 OFFSET 40;
```
## MIN and MAX Functions
```sql
-- Return the lowest price in the products table:
SELECT MIN(price)
FROM products;

-- Return the lowest price, and name the column lowest_price:
SELECT MIN(price) AS lowest_price
FROM products;
```












### mongodb
### prisma 
### indexing
