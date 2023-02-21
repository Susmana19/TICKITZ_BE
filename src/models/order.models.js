const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const orderModel = {

    getByUserId: (user_id)=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from tb_order WHERE user_id='${user_id}'`,
                (err, result) => {
                    if (err) {
                    return reject(err.message)
                    } else {                     
                    return resolve(result.rows[0])
                    }
            });
        })
    },

    getByMoviesId: (movies_id)=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from tb_order WHERE movies_id='${movies_id}'`,
                (err, result) => {
                    if (err) {
                    return reject(err.message)
                    } else {                   
                    return resolve(result.rows[0])
                    }
            });
        })
    },

  add: ({
    order_id,
    user_id,
    movies_id,
    movies_name,
    date,
    time,
    theater,
    seats,
    total_seats,
    price, 
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO tb_order (order_id, user_id, movies_id, movies_name, date, time, theater, seats, total_seats, price ) VALUES ('${uuidv4()}','${user_id}', 
        '${movies_id}', '${movies_name}', '${date}', '${time}', '${theater}', 
        '${seats}', '${total_seats}', '${price}') RETURNING order_id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
                order_id,
                user_id,
                movies_id,
                movies_name,
                date,
                time,
                theater,
                seats,
                total_seats,
                price 
            });
          }
        }
      );
    });
  },
};

module.exports = orderModel;
