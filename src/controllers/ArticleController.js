import Article from '../models/Article';
import Author from '../models/Author';

class ArticleController {
  async create(req, res) {
    try {
      const { category, title, summary, firstParagraph, body } = req.body;  

      const id = req.id;
 
      // Find the author related to the user id (if exists)
      const ArticleAuthor = await Author.query().findOne({ user_id: id });

      if (!ArticleAuthor) {
        return res.status(404).json({error: "You must be an Author to create an article!"})
      }

      const author_id = ArticleAuthor.id

      await Article.query().insert({ category, title, summary, body, firstParagraph, author_id, user_id: id })

      return res.json(req.body);

    } catch (error) {
      console.log(error)
      res.status(400).json({"error": error})
    }
  }

  async index(req, res) {
    try {
      const allArticles = await Article.query().select();

      return res.json(allArticles);

    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
        const { category, title, summary, body, firstParagraph } = req.body

        const userId = req.id

        const id = req.params.id

        const article = await Article.query().findById(id)

        // Only the author (user) can update his own article.
        if (article.user_id == userId) {
            const numUpdated = await Article.query().findById(id).patch({ category, title, summary, body, firstParagraph })
  
            return res.json({numUpdated});
        }

        return res.json({error: "You must be the author of the article to update it."});
  
      } catch (error) {
        return res.status(400).json(error);
      }
  }

  async delete(req, res) {
    try {
        // User Id - ADM
        const userId = req.id

        // Article id
        const id = req.params.id

        // Find an article related to the param id
        const article = await Article.query().findById(id)

        // Only the author (user) can delete his own article.
        if (article.user_id == userId) {
            const numUpdated = await Article.query().deleteById(id)
  
            return res.json({numUpdated});
        }

        return res.json({error: "You must be the author of the article to delete it."});

    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findById(req, res) {
    try {
    const id = req.params.id

    const { category, title, summary, firstParagraph, body, author_id } = await Article.query().findById(id)
    
    const authorJoin = await Article.query().withGraphJoined('authors').where('authors.id', author_id)

    const postAuthor = authorJoin[0].authors;

    if (req.Login){
        return res.json({ author: { name: postAuthor.name, picture: postAuthor.picture}, category, title, summary, firstParagraph, body })
    }

    return res.json({ author: { name: postAuthor.name, picture: postAuthor.picture}, category, title, summary, firstParagraph })

    }catch(error){
        console.log(error)
        res.status(400).json({ error: "Article not found!" })
    }

  }

  async findByCategory(req, res) {
    try{
    const category = req.query.category

    // Find all articles and join the related authors
    const authorJoin = await Article.query().where('category', category).withGraphJoined('authors') 

    if (authorJoin.length == 0) {
      return res.json({errors: "Category not found!"})
    }

    var format = []
    
    for ( let el of authorJoin){
      const author = el.authors;

      format.push({author: {name: author.name, picture: author.picture}, category: el.category, title: el.title, summary: el.summary })
    }
   // const format = {author}

    res.json(format)
    }catch(e){
        console.log(e)
        res.status(400).json({errors: e})
    }
  }

}

module.exports = new ArticleController();