const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const moviesModel = {
  query: (search, category, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY movies_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;
    if (!search && !category) {
      return orderQuery;
    } else if (search && category) {
      return `WHERE movies_name LIKE '%${search}%' AND category LIKE '${category}%' ${orderQuery}`;
    } else if (search || category) {
      return `WHERE movies_name LIKE '%${search}%' OR category LIKE '${category}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, category, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from movies ${this.query(
          search,
          category,
          sortBy,
          limit,
          offset
        )}`,
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
        `SELECT users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.phone_number,
        users.password,
        users.pin,
        json_agg(row_to_json(users_images)) images
        FROM users INNER JOIN users_images ON users.id=users_images.id_users AND
        id='${id}'
        GROUP BY users.id `,

        // `SELECT * from users WHERE id='${id}'`,

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

  add: ({
    movies_names,
    category,
    image,
    realesedates,
    duration,
    director,
    casts,
    synopsis,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO movies (movies_id, movies_name, category, image, dates,  duration, director, casts, synopsis) VALUES ('${uuidv4()}','${movies_names}','${category}','${image}','${realesedates}','${duration}','${director}','${casts}','${synopsis}') RETURNING movies_id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              movies_names,
              category,
              image,
              realesedates,
              duration,
              director,
              casts,
              synopsis,
            });
          }
        }
      );
    });
  },
};

module.exports = moviesModel;
