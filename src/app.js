import express from 'express'
import knexfile from '../src/db/knexfile'

import UserRoutes from './routes/UserRoutes';
import AuthorRoutes from './routes/AuthorRoutes';
import AdminArticleRoutes from './routes/AdminArticleRoutes';
import ArticleRoutes from './routes/ArticleRoutes';

import setupDb from '../src/db/db-setup'
import cookieParser from 'cookie-parser'

setupDb();

class App {
  constructor() {
    // Every time that you create a instance of the "App" class
    // you'll call all the constructor functions.
    this.app = express();
    this.middlewares();
    this.routes();
  }

  // Functions that stay in the middle of certain "actions".
  // The "action required" needs to pass through these functions to reach the final objective.
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser())
  }

  // Routes that will help you handle HTTP requests.
  routes() {
    this.app.use('/api/', UserRoutes);
    this.app.use('/api/admin/authors', AuthorRoutes)
    this.app.use('/api/admin/articles', AdminArticleRoutes)
    this.app.use('/api/articles', ArticleRoutes)
  }
}


module.exports = new App().app;

