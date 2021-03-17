// Update with your config settings.
const path = require('path')

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'challenge',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },

/*
development: {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'meubanco.db')
  },
  migrations: {
    directory: __dirname + '/migrations',
  },
  seeds: {
    directory: __dirname + '/seeds'
  }
},
*/

};
