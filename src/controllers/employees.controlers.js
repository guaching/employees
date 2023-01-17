import { pool } from "../db.js";
import { inicio } from "./index.controlles.js";

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

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    console.log(req.body);
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    return inicio(req, res);
    // return getEmployees(res);

    // res.redirect("/api/employees");
    // res.send({
    //   id: rows.insertId,
    //   name,
    //   salary,
    // });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEmployes = async (req, res, rows) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return inicio(req, res);

    // return getEmployees();
    // res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatesEmployes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    console.log(req.body);
    res.render("employees_edit", {
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatesEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return inicio(req, res);

    // return getEmployees();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
