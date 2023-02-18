
const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid')

const userModel = {
    
    getById: (user_id)=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from tb_users WHERE user_id='${user_id}'`,
                (err, result) => {
                    if (err) {
                    return reject(err.message)
                    } else {
                    return resolve(result.rows[0])
                    }
            });
        })
    },

    update: ({
        user_id,
        profile_image, 
        fullname, 
        email, 
        phone, 
        password,
        })=> {
        return new Promise((resolve, reject)=> {
            db.query(`SELECT * FROM tb_users WHERE user_id='${user_id}'`,(err, result)=>{
                if(err) {
                    return reject(err.message)
                }else {
           db.query(
            `UPDATE tb_users SET profile_image='${
              profile_image
                ? profile_image.filename
                : result.rows[0].profile_image
            }', fullname='${fullname || result.rows[0].fullname}', email='${email || result.rows[0].email}',  phone='${phone || result.rows[0].phone}', password='${password || result.rows[0].password}'  WHERE user_id='${user_id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({
                  user_id,
                  profile_image,
                  fullname,
                  email,  
                  phone,
                  password,       
                });
              }
            }
          );
                }
            })
        })
    },

}

module.exports = userModel;