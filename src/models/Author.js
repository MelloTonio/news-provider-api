import User from './User'
import Article from './Article'

const { Model } = require('objection');

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'picture'],

      properties: {
        id: { type: 'integer' },
        parentId: { type: ['integer', 'null'] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        picture: { type: 'string', minLength: 1, maxLength: 650 },
        user_id:{ type: 'integer' }
      }
    };
  }

  static get relationMappings(){
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'authors.user_id',
          to: 'users.id'
        }
     },

     articles: {
        relation: Model.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'authors.id',
          to: 'articles.author_id'
        }
     }
   }
  } 

}

module.exports = Author;
