-- Lab 4.10.3: Athena queries (course lesson resource).
-- Run ONE query at a time in the Athena query editor.
-- Replace [YOUR_BUCKET_NAME] with the bucket that holds TestData.csv.

-- First query: create a database
create database demo;

-- Second query: create a table that reads the CSV straight from S3.
-- OpenCSVSerde with separatorChar ';' because the file uses semicolons, not commas.
-- skip.header.line.count = 1 skips the "id;name;score" heading row.
CREATE EXTERNAL TABLE demo.students (
  id INT,
  name STRING,
  score INT
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
WITH SERDEPROPERTIES (
  'separatorChar'=';',
  'quoteChar'='"'
)
LOCATION 's3://[YOUR_BUCKET_NAME]/'
TBLPROPERTIES ('skip.header.line.count'='1');

-- Third query: see all the data
SELECT * FROM demo.students;
