import knex from 'knex';
import knexfile from './knexfile.js'
import { Model } from 'objection'

function setupDb(){
    const db = knex(knexfile.development)
    Model.knex(db)
}

export default setupDb;