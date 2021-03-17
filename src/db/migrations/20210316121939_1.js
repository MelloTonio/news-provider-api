
exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments();
            table.string('username').notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('isAdmin').notNullable();
            table.timestamps(true,true);
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
