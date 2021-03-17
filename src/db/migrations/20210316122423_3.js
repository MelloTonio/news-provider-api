
exports.up = function(knex) {
    return knex.schema
      .createTable('articles', (table) => {
        table.increments();
        table.string('category').notNullable();
        table.string('title').notNullable();
        table.string('summary').notNullable();
        table.string('firstParagraph').notNullable();
        table.string('body').notNullable();
        table.integer('author_id').references('id').inTable('authors');
        table.integer('user_id').references('id').inTable('users');
        table.timestamps(true,true);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
          .dropTableIfExists('articles')
  };
  