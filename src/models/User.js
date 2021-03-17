import bcrypt from 'bcrypt';

const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        parentId: { type: ['integer', 'null'] },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email:    { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        isAdmin:  { type: 'integer' }
      }
    };
  }


  async $beforeInsert(queryContext){
    await super.$beforeInsert(queryContext);

    await this.generateHash()
    this.setRole()
  }

  async setRole(){
      // Change here to 1 if its the first user.
      this.isAdmin = 0
  }

  async generateHash() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

}

export default User;
