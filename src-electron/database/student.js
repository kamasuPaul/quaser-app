//create, update, delete, get, and get all students
import database from "./database";
import knex from "knex";

//student object
let student = {};

/**
 * add student to the students table
 * @param {*} student student details
 */
student.create = function (student) {
  let data = {
    name: student.name,
    class: student.class,
    gender: student.gender,
    residency: student.residency,
  };
  return database
    .insert(data)
    .into("students")
    .then((res) => {
      data.id = res[0];
      return data;
    });
};

/**
 * update student details
 * @param {*} id id of student to be updated
 */
student.update = function (id) {
  console.log("update function called");
};
//delete student function
student.destroy = function (id) {
  console.log("delete function called", id);
  return database
    .from("students")
    .where("id", id)
    .del()
    .then((response) => {
      return response;
    });
};
//get student function
student.get = function (id) {
  console.log("get function called");
};
//get all students function
student.getAll = function () {
  return database
    .select()
    .from("students")
    .then((students) => {
      return students;
    });
};

export default student;
