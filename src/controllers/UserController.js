import User from '../models/User'


class UserController {
  async create(req, res) {
    try {
      
      await User.query().insert(req.body)

      return res.json(req.body);
    } catch (error) {
      console.log(error)
      res.status(400).json({error: "Error creating user" })
    }
  }

  async index(req, res) {
    try {
      const authorUser = await User.query().select();

    //  const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(authorUser);
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {

      var email = req.body.email
      await User.query().delete().where({ email: email })

      return res.json({ "success": true });

    } catch (error) {
      return res.json(error);
    }
  }

}

module.exports = new UserController();
