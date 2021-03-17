
exports.up = function(knex) {
    return knex.schema
      .createTable('authors', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('picture').notNullable();
        // author must be an user;
        table.integer('user_id').references('id').inTable('users').unique();
        table.timestamps(true,true);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
          .dropTableIfExists('authors')
  };
  