var express = require("express")
var db = require("../database/db")
var route = express.Router()

route.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
  
    db.query(
      "INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)",
      [name, age, country, position, wage],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  route.get("/employees", (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  route.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employee SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  route.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  module.exports = route;