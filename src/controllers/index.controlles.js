import { pool } from "../db.js";

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.json(result[0]);
};


export const inicio = async (req, res, rows) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");

    res.render("employees", {
      data: rows
    });

    // res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// export const getEmployees = async (res, rows) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM employee");

//     res.render("employees", {
//       data: rows,
//     });

//     // res.json(rows);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const inicio = (req, res, rows) => {
//     res.render("employees", {
//         data: rows,
//       });
// }
