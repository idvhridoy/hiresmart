const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const db = knex(config);

Model.knex(db);

module.exports = db;
