import Author from '../models/Author'


class AuthorController {
  async create(req, res) {
    try {
      const { picture } = req.body;  

      const id = req.id;
      const name = req.name;

      await Author.query().insert({ user_id: id, name: name, picture: picture })

      return res.json(req.body);

    } catch (error) {
      console.log(error)
      res.json({"error": error})
    }
  }

  async index(req, res) {
    try {
      const authorUser = await Author.query().select();

      return res.json(authorUser);

    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
        const { name, picture } = req.body
        const id = req.id;

        // Update the author related to the current Administrator
        const numUpdated  = await Author.query().patch({ name, picture }).where({ user_id: id })
       
        if (numUpdated == 0){
            return res.json({ error: "It was not possible to update the author!" });   
        }

        return res.json({ numUpdated });
  
      } catch (error) {
        return res.json(error);
      }
  }

  async delete(req, res) {
    try {
      const id = req.id;

      // Delete the author related to the current Administrator
      const numDeleted = await Author.query().delete().where({ user_id: id })

      if (numDeleted == 0){
        return res.json({ error: "It was not possible to delete this author!" });   
    }

     return res.json({ numDeleted });

    } catch (error) {
      return res.json(error);
    }
  }

}

module.exports = new AuthorController();