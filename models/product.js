const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = {

  /**
   * List products
   * @param  {Object} options [Query options]
   * @return {Array}          [Array of products]
   */
  find: async function(options = {}) {
    try {

      const statement = `SELECT *
                         FROM products`;
      const values = [];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw err;
    }
  },

  /**
   * Retrieve product by ID
   * @param  {Object}      id [Product ID]
   * @return {Object|null}    [Product record]
   */
  findOne: async function(id) {
    try {

      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`;
      const values = [id];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw err;
    }
  },

  create: async function(data) {
    try {

        // Generate SQL statement - using helper for dynamic parameter injection
        const statement = pgp.helpers.insert(data, null, 'products') + 'RETURNING *';
   
        // Execute SQL statment
        const result = await db.query(statement);
  
        if (result.rows?.length) {
          return result.rows[0];
        }
  
        return null;
  
      } catch(err) {
        throw new Error(err);
      }
  }
}