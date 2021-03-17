# Jungle Devs - Node Challenge #001

## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB
- `npm install` will install all required dependencies
- `npm run migrate` will migrate the database structure
- `npm run dev` is configured to start the server.js using nodemon

## Rules
- The User has a field "isAdmin" that is automatically set to 0 (not an admin) with a query hook
- A User is not necessarily a author, but an Author is necessarily a User (other Admins cannot change it)
- Only Users with `"isAdmin" == 1` can become an Author or create Articles
- The Author has a reference to the User, An admin User cannot create an Author that don't reference himself.
- An admin User cannot delete or update an Author other than himself.


## Routes
- base_url: http://localhost:3001
### Users
 - GET `{{base_url}}/api/` - List all existent users in the database (login required)
 - POST `{{base_url}}/api/sign-up` - Insert one user in the database
 - POST `{{base_url}}/api/login` - Authenticate user, checks if the JWT exist in req.cookies and validate it
 
### Authors
- GET `{{base_url}}/api/admin/authors` - List all existent authors in the database (admin required)
- POST `{{base_url}}/api/admin/authors` - Insert one author in the database, the author will have the same name and id of the User (admin required)
- PUT `{{base_url}}/api/admin/authors` - Update the author related to the User (admin required)
- DELETE `{{base_url}}/api/admin/authors` - Delete the author related to the User (admin required)

### Articles
- GET `{{base_url}}/api/admin/articles` - list all articles (admin required)
- POST `{{base_url}}/api/admin/articles` - create one article related to the current Author (found by the current User id) (admin required)
- PUT `{{base_url}}/api/admin/articles/:id` - update one Author if the current logged User is the Author (admin required)
- DELETE `{{base_url}}/api/admin/articles/:id` - delete one Author if the current logged User is the Author (admin required)
- GET `{{base_url}}/api/articles/:id` - Find one Article by id, shows the entire Article if logged in, if not logged it will show only the first paragraph
- GET `{{base_url}}/api/articles?category=:slug`- Find all articles related to one category


