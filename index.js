var koa       = require('koa');
var r         = require('rethinkdb');
var serve     = require('koa-static');
var parse     = require('co-body');
var router    = require('koa-router')();
var cors      = require('koa-cors');
var http      = require('http');

// Initialize App
var app = koa();

app.use(cors());

// Load Config
var config    = require(__dirname+"/config.js");


// Static Content
app.use(serve(__dirname+'/public'));

// Create a RethinkDB Connection
app.use(createConnection);

// Setup koa-router
router.get('/todo/get', get);
router.put('/todo/new', create);
router.post('/todo/update', update);
router.post('/todo/delete', del);
app
  .use(router.routes())
  .use(router.allowedMethods());

// Close the RethinkDB Connection
app.use(closeConnection);

/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
function* createConnection(next) {
    try{
        var conn = yield r.connect(config.rethinkdb);
        this._rdbConn = conn;
    }
    catch(err) {
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

// Retrieve all todos
function* get(next) {
    try{
        var cursor = yield r.table('todos').orderBy({index: "createdAt"}).run(this._rdbConn);
        var result = yield cursor.toArray();
        this.body = JSON.stringify(result);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

// Create a new todo
function* create(next) {
    try{
        var todo = yield parse(this);
        console.log(this.text);

        todo.createdAt = r.now(); // Set the field `createdAt` to the current time
        var result = yield r.table('todos').insert(todo, {returnChanges: true}).run(this._rdbConn);

        todo = result.changes[0].new_val; // todo now contains the previous todo + a field `id` and `createdAt`
        this.body = JSON.stringify(todo);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

// Update a todo
function* update(next) {
    try{
        var todo = yield parse(this);
        delete todo._saving;
        if ((todo == null) || (todo.id == null)) {
            throw new Error("The todo must have a field `id`.");
        }

        var result = yield r.table('todos').get(todo.id).update(todo, {returnChanges: true}).run(this._rdbConn);
        this.body = JSON.stringify(result.changes[0].new_val);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

// Delete a todo
function* del(next) {
    try{
        var todo = yield parse(this);
        if ((todo == null) || (todo.id == null)) {
            throw new Error("The todo must have a field `id`.");
        }
        var result = yield r.table('todos').get(todo.id).delete().run(this._rdbConn);
        this.body = "";
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

/*
 * Close the RethinkDB connection
 */
function* closeConnection(next) {
  this._rdbConn.close();
}




// Connect to RethinkDB and start Koa
r.connect(config.rethinkdb, function(err, conn) {
    if (err) {
        console.log("Could not open a connection to initialize the database");
        console.log(err.message);
        process.exit(1);
    }

    r.table('todos').indexWait('createdAt').run(conn).then(function(err, result) {
        console.log("Table and index are available, starting koa...");
        startKoa();
    }).error(function(err) {
        // The database/table/index was not available, create them
        r.dbCreate(config.rethinkdb.db).run(conn).finally(function() {
            return r.tableCreate('todos').run(conn)
        }).finally(function() {
            r.table('todos').indexCreate('createdAt').run(conn);
        }).finally(function(result) {
            r.table('todos').indexWait('createdAt').run(conn)
        }).then(function(result) {
            console.log("Table and index are available, starting koa...");
            startKoa();
            conn.close();
        }).error(function(err) {
            if (err) {
                console.log("Could not wait for the completion of the index `todos`");
                console.log(err);
                process.exit(1);
            }
            console.log("Table and index are available, starting koa...");
            startKoa();
            conn.close();
        });
    });
});

// Start Koa
function startKoa() {
    app.listen(config.koa.port);
    console.log('Listening on port '+config.koa.port);
}
