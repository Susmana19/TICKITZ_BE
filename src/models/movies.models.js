const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");
const { time } = require("console");

const moviesModel = {
  query: (search, category, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY m.movies_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (search && category) {
      return `WHERE m.movies_name LIKE '%${search}%' AND m.category LIKE '${category}%' ${orderQuery}`;
    } else if (search || category) {
      return `WHERE m.movies_name LIKE '%${search}%' OR m.category LIKE '${category}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },
  whereSearchAndCategory: (search, category) => {
    if (search && category) {
      return `WHERE m.movies_name ILIKE '%${search}%' AND m.category ILIKE '${category}%'`;
    } else if (search || category) {
      return `WHERE m.movies_name ILIKE '%${search}%' OR m.category ILIKE '${category}%'`;
    } else {
      return "";
    }
  },

  orderAndGroup: (sortBy, limit, offset) => {
    return `ORDER BY m.movies_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;
  },

  get: function (search, category, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        m.*, 
        ( 
          SELECT json_agg(i)
          FROM (
            SELECT t.theaters_name AS theaters_name, t.theaters_id AS theaters_id 
            FROM theaters t WHERE t.movies_id = m.movies_id
          ) i
        ) AS theaters,
        ( 
          SELECT json_agg(j)
          FROM (
            SELECT times.times AS times, times.times_id AS times_id 
            FROM times  WHERE times.movies_id = m.movies_id
          ) j
        ) AS times,
          ( 
          SELECT json_agg(l)
          FROM (
            SELECT c.cities_name AS cities_name, c.cities_id AS cities_id 
            FROM cities c  WHERE c.movies_id = m.movies_id
          ) l
        ) AS cities
      FROM movies m
        ${this.whereSearchAndCategory(search, category)}
        ${this.orderAndGroup(sortBy, limit, offset)}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        m.*, 
        ( 
          SELECT json_agg(i)
          FROM (
            SELECT t.theaters_name AS theaters_name, t.theaters_id AS theaters_id 
            FROM theaters t WHERE t.movies_id = m.movies_id
          ) i
        ) AS theaters,
        ( 
          SELECT json_agg(j)
          FROM (
            SELECT times.times AS times, times.times_id AS times_id 
            FROM times  WHERE times.movies_id = m.movies_id
          ) j
        ) AS times,
          ( 
          SELECT json_agg(l)
          FROM (
            SELECT c.cities_name AS cities_name, c.cities_id AS cities_id 
            FROM cities c  WHERE c.movies_id = m.movies_id
          ) l
        ) AS cities
      FROM movies m WHERE 
      m.movies_id='${id}'
      `,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  getSeatId: (seat_id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT seats.seats_id,seats.seats_name FROM seats WHERE seats_id ='${seat_id}' `,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  add: async ({
    movies_names,
    category,
    image,
    releasedate,
    duration,
    director,
    casts,
    price,
    synopsis,
    theaters,
    times,
    cities,
  }) => {
    const movies_id = uuidv4();
    try {
      // Insert data into movies table
      await db.query(
        `INSERT INTO movies (movies_id, movies_name, category, image, release_date,  duration, director, casts, price, synopsis) VALUES ('${movies_id}','${movies_names}','${category}','${image}','${releasedate}','${duration}','${director}','${casts}','${price}','${synopsis}')`
      );

      // Insert data into theaters table
      for (let i = 0; i < theaters.length; i++) {
        const theaters_id = uuidv4();
        await db.query(
          `INSERT INTO theaters (theaters_id, movies_id, theaters_name) VALUES ('${theaters_id}','${movies_id}', '${theaters[i]}')`
        );
      }

      // Insert data into times table
      for (let i = 0; i < times.length; i++) {
        const times_id = uuidv4();
        await db.query(
          `INSERT INTO times (times_id, movies_id, times) VALUES ('${times_id}','${movies_id}', '${times[i]}')`
        );
      }

      // Insert data into cities table
      for (let i = 0; i < cities.length; i++) {
        const cities_id = uuidv4();
        await db.query(
          `INSERT INTO cities (cities_id, movies_id, cities_name) VALUES ('${cities_id}','${movies_id}', '${cities[i]}')`
        );
      }

      return {
        movies_names,
        category,
        image,
        releasedate,
        duration,
        director,
        casts,
        price,
        synopsis,
        theaters,
        times,
        cities,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  remove: async (id) => {
    try {
      // Delete data from theaters table
      await db.query(`DELETE FROM theaters WHERE movies_id = '${id}'`);

      // Delete data from times table
      await db.query(`DELETE FROM times WHERE movies_id = '${id}'`);

      // Delete data from cities table
      await db.query(`DELETE FROM cities WHERE movies_id = '${id}'`);

      // Delete data from movies table
      const result = await db.query(
        `DELETE FROM movies WHERE movies_id = '${id}' RETURNING *`
      );

      return result.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = moviesModel;
