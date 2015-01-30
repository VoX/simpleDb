var simpleDb = require("./simpleDb.js");
var fs = require("fs");

var testDbPath = "./test.db";
cleanupDbLog(testDbPath);

function cleanupDbLog(path){
	try{
		fs.unlinkSync(path);
	}
	catch(ex){

	}
}

exports.simpleDb_setGet_getReturnsSetValue = function(test){
	var db = new simpleDb(testDbPath, fs);
	db.set("key1","val1");
    test.equal(db.get("key1"), "val1", "retrieved value does not match set value");
    cleanupDbLog(testDbPath);
    test.done();
};

exports.simpleDb_setWithoutFlush_getReturnsUndefined = function(test){
	var db = new simpleDb(testDbPath, fs);
	db.set("key1","val1");

	var db2 = new simpleDb(testDbPath, fs);

    test.equal(db2.get("key1"), undefined, "unflushed data should not be retrievable in new db instances");
    cleanupDbLog(testDbPath);
    test.done();
};


exports.simpleDb_setWithFlush_getReturnsValue = function(test){
	var db = new simpleDb(testDbPath, fs);
	db.set("key1","val1");
	db.flush();

	var db2 = new simpleDb(testDbPath, fs);

    test.equal(db2.get("key1"), "val1", "flushed data should be retrievable in new db instances");
    cleanupDbLog(testDbPath);
    test.done();
};

