module.exports = {
    rethinkdb: {
        host: "localhost",
        port: 28015,
        authKey: "",
        db: "foundation"
    },
    koa: {
        port: process.env.PORT || 2200
    }
}
