import Author from './Author'
import User from './User'
import path from 'path'

const { Model } = require('objection');

class Article extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'articles';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['category', 'title', 'firstParagraph', 'body'],

      properties: {
        id: { type: 'integer' },
        parentId: { type: ['integer', 'null'] },
        category: { type: 'string', minLength: 1, maxLength: 255 },
        title: { type: 'string', minLength: 1, maxLength: 650 },
        summary:{ type: 'string', minLength: 1, maxLength: 650 },
        firstParagraph:{ type: 'string', minLength: 1, maxLength: 650 },
        author_id: { type: 'integer' },
        user_id: { type: 'integer' },
        // IDK how to set MAX char length
        body:{ type: 'string', minLength: 1, maxLength: 1800 },
      }
    };
  }


  static get relationMappings(){
    return {
     authors: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'Author'),
        join: {
          from: 'articles.author_id',
          to: 'authors.id'
        }
     },

     users: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'articles.user_id',
        to: 'users.id'
      }
   }
   }
  } 

}

export default Article;
