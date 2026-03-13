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
## PostgreSQL JOINS
- A JOIN clause is used to combine rows from two or more tables, based on a related column between them.
```sql
-- products table:
product_id |  product_name  | category_id
------------+----------------+-------------
         33 | Geitost        |           4
         34 | Sasquatch Ale  |           1
         35 | Steeleye Stout |           1
         36 | Inlagd Sill    |           8

-- categories table:
category_id | category_name
-------------+----------------
           1 | Beverages
           2 | Condiments
           3 | Confections
           4 | Dairy Products

-- Join products to categories using the category_id column:
select product_id, product_name, category_name
from products
INNER JOIN categories ON products.category_id = categories.category_id;

-- result
 product_id |  product_name  | category_name
------------+----------------+----------------
         33 | Geitost        | Dairy Products
         34 | Sasquatch Ale  | Beverages
         35 | Steeleye Stout | Beverages
         36 | Inlagd Sill    | Seafood
```
- INNER JOIN: Returns records that have matching values in both tables
- LEFT JOIN: Returns all records from the left table, and the matched records from the right table
- RIGHT JOIN: Returns all records from the right table, and the matched records from the left table
- FULL JOIN: Returns all records when there is a match in either left or right table
- CROSS JOIN: Returns the Cartesian product of two or more tables (combines every row from the first table with every row from the second table)

## INNER JOIN
```sql
-- testproducts table:
testproduct_id |      product_name      | category_id
----------------+------------------------+-------------
              1 | Johns Fruit Cake       |           3
              2 | Marys Healthy Mix      |           9
              3 | Peters Scary Stuff     |          10
              4 | Jims Secret Recipe     |          11
              5 | Elisabeths Best Apples |          12
              6 | Janes Favorite Cheese  |           4
              7 | Billys Home Made Pizza |          13
              8 | Ellas Special Salmon   |           8
              9 | Roberts Rich Spaghetti |           5
            10 | Mias Popular Ice        |          14
(10 rows)

-- categories table:
category_id | category_name  |                       description
-------------+----------------+------------------------------------------------------------
           1 | Beverages      | Soft drinks, coffees, teas, beers, and ales
           2 | Condiments     | Sweet and savory sauces, relishes, spreads, and seasonings
           3 | Confections    | Desserts, candies, and sweet breads
           4 | Dairy Products | Cheeses
           5 | Grains/Cereals | Breads, crackers, pasta, and cereal
           6 | Meat/Poultry   | Prepared meats
           7 | Produce        | Dried fruit and bean curd
           8 | Seafood        | Seaweed and fish
(8 rows)
```
- Notice that many of the products in testproducts have a category_id that does not match any of the categories in the categories table.
- By using INNER JOIN we will not get the records where there is not a match, we will only get the records that matches both tables:
```sql
-- Join testproducts to categories using the category_id column:
SELECT testproduct_id, product_name, category_name
FROM testproducts
INNER JOIN categories ON testproducts.category_id = categories.category_id;

-- Only the records with a match in BOTH tables are returned:

```
## Group BY
- GROUP BY is used to group rows with the same values and perform aggregate calculations like COUNT, SUM, or AVG on each group.
```sql
SELECT customer, COUNT(*) AS total_orders
FROM Orders
GROUP BY customer;
```
## HAVING
- The HAVING clause was added to SQL because the WHERE clause cannot be used with aggregate functions.
- Aggregate functions are often used with GROUP BY clauses, and by adding HAVING we can write condition like we do with WHERE clauses.
```sql
SELECT COUNT(customer_id), country
FROM customers
GROUP BY country
HAVING COUNT(customer_id) > 5;
```













