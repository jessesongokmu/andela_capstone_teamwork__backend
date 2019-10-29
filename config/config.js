module.exports = {

    development:
        {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host:  process.env.DB_HOST,
            dialect:   "pgsql"
        },

    test :
        {
            username :    "postgres",
            password: "postgres",
            database: "test_andela_teamwork",
            host :     "127.0.0.1",
            dialect :   "pgsql"
        },

    production:
        {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host:  process.env.DB_HOST,
            dialect:   "pgsql"
        }
}
