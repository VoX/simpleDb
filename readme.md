# simpleDb
Simple db is a very simple in memory key value store which can be persisted to a file. 

## Usage
Simply new up a database with the location the database file should be read from / persisted to. All database operations are performed in memory and only written to disk when flush is called. 

```
var simpleDb = require("./simpleDb.js");
var fs = require("fs");

var db = new simpleDb("./main.db", fs);
db.set("key1","val1");
var val = db.get("key1");
db.flush();
```

## Tests
1. To run the tests first install nodeunit

	`npm install nodeunit -g`

2. Run the tests!

	`nodeunit simpleDbTests.js`

