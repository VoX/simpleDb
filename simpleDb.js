module.exports = simpleDb;

//simpleDb constructor
//path to log file
function simpleDb(path, fs){
	this.path = path;
	this.instance = {};
	this.pending_writes = {};
	this.fs = fs;
	var initialLogs = this._readlogs();
	for(var i in initialLogs){
		this._apply(initialLogs[i]);
	}
}

//reads all the log files and returns an array of operations to be applied
simpleDb.prototype._readlogs = function(){
	var operations = [];
	try{
		var lines = this.fs.readFileSync(this.path, {encoding:"utf-8"}).split("\n");
		for (var i = 0; i < lines.length; i++) {
			try{
				operations.push(JSON.parse(lines[i]));
			}
			catch(ex){
			}
		};
	}
	catch(ex){
		console.log("error opening db file." + ex);
	}
	return operations;
};

//reads all the log files and returns an array of operations to be applied
simpleDb.prototype._readlogs = function(){
	var operations = [];
	try{
		var lines = this.fs.readFileSync(this.path, {encoding:"utf-8"}).split("\n");
		for (var i = 0; i < lines.length; i++) {
			try{
				operations.push(JSON.parse(lines[i]));
			}
			catch(ex){
			}
		};
	}
	catch(ex){
		console.log("error opening db file." + ex);
	}
	return operations;
};

//applies a operation to the in memory simpleDb
simpleDb.prototype._apply = function(operation){
	this.instance[operation.key] = operation.value;
};

//set a key to a value
simpleDb.prototype.set = function(key, value){
	var operation = {"key":key, "value":value};
	this._apply(operation);
	this.pending_writes[key] = operation;
};

//retrieves the value of the given key
simpleDb.prototype.get = function(key){
	return this.instance[key];
};

//writes the pending logs out to disk
simpleDb.prototype.flush = function(){
	for(var i in this.pending_writes){
		this.fs.appendFileSync(this.path, JSON.stringify(this.pending_writes[i]) + "\n", {encoding:"utf-8"});
	}
	this.pending_writes = {};
};

