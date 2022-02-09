//create, update, delete, get, and get all students
import database from "./database";

//student object
let student = {};

/**
 * add student to the students table
 * @param {*} student student details
 */
student.create = function (student) {
  database
    .insert({
      name: student.name,
      class: student.class,
      gender: student.gender,
      residency: student.residency,
    })
    .into("students")
    .then(() => {
      console.log("student added");
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
  console.log("delete function called");
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
