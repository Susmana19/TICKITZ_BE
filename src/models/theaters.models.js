const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const theatersModel = {
  add: async ({ moviesId, theaters_name, times, price, city }) => {
    const theaters_id = uuidv4();

    try {
      // Insert data into theaters table
      await db.query(
        `INSERT INTO theaters (theaters_id, movies_id, theaters_name, price) VALUES ('${theaters_id}','${moviesId}','${theaters_name}','${price}')`
      );

      // Insert data into times table
      for (let i = 0; i < times.length; i++) {
        await db.query(
          `INSERT INTO times (times_id, theaters_id, times) VALUES ('${uuidv4()}','${theaters_id}', '${
            times[i]
          }')`
        );
      }

      // Insert data into city table
      for (let i = 0; i < city.length; i++) {
        await db.query(
          `INSERT INTO city (city_id, theaters_id, city) VALUES ('${uuidv4()}','${theaters_id}', '${
            city[i]
          }')`
        );
      }

      return {
        moviesId,
        theaters_name,
        times,
        price,
        city,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = theatersModel;
// const db = require("../../helper/connection");
// const { v4: uuidv4 } = require("uuid");

// const theatersModel = {
//   add: ({ moviesId, theaters_name, times, price, city }) => {
//     return new Promise((resolve, reject) => {
//       const theaters_id = uuidv4();

//       // Insert data into theaters table
//       db.query(
//         `INSERT INTO theaters (theaters_id, movies_id, theaters_name, price) VALUES ('${theaters_id}','${moviesId}','${theaters_name}','${price}')`,
//         (err, result) => {
//           if (err) {
//             return reject(err.message);
//           } else {
//             // Insert data into times table
//             db.query(
//               `INSERT INTO times (times_id, theaters_id, times) VALUES ('${uuidv4()}','${theaters_id}', '${times}')`,
//               (err, result) => {
//                 if (err) {
//                   return reject(err.message);
//                 } else {
//                   // Insert data into city table
//                   db.query(
//                     `INSERT INTO city (city_id, theaters_id, city) VALUES ('${uuidv4()}','${theaters_id}', '${city}')`,
//                     (err, result) => {
//                       if (err) {
//                         return reject(err.message);
//                       } else {
//                         return resolve({
//                           moviesId,
//                           theaters_name,
//                           times,
//                           price,
//                           city,
//                         });
//                       }
//                     }
//                   );
//                 }
//               }
//             );
//           }
//         }
//       );
//     });
//   },
// };
// module.exports = theatersModel;
