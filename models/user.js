const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = {

  /**
   * Creates a new user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Created user record]
   */
  create: async function(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  },

  /**
   * Updates a user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Updated user record]
   */
  update: async function(data) {
    try {

      const { id, ...params } = data;

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(params, null, 'users') + condition;
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  },

  /**
   * Finds a user record by email
   * @param  {String}      email [Email address]
   * @return {Object|null}       [User record]
   */
  findOneByEmail: async function(email) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  },

  /**
   * Finds a user record by ID
   * @param  {String}      id [User ID]
   * @return {Object|null}    [User Record]
   */
  findOneById: async function(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [id];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }
}