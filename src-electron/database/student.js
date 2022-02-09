//create, update, delete, get, and get all students
import database from "./database";

//create student function
let student = {};
student.create = function (student) {
  console.log("create function called");
  console.log(student);
  //add student to the students table
  database
    .insert({ name: student.name, class: student.class })
    .into("students")
    .then(() => {
      console.log("student added");
    });
};
//update student function
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
  return database.select().from("students").then((students) => {
    return students;
  });
};

export default student;
