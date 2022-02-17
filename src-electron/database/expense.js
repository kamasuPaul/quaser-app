//create, update, delete, get, and get all expenses
import database from "./database";
import knex from "knex";

//expense object
let expense = {};

/**
 * add expense to the expenses table
 * @param {*} expense expense details
 */
expense.create = function (expense) {
  let data = {
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    reference_number: expense.reference_number,
    description: expense.description
  };
  return database
    .insert(data)
    .into("expenses")
    .then((res) => {
      data.id = res[0];
      return data;
    });
};

/**
 * update expense details
 * @param {*} id id of expense to be updated
 */
expense.update = function (id, data) {
  console.log("update function called");
  console.log(data)
  return database
    .from("expenses")
    .where("id", id)
    .update(data)
    .then((response) => {
      console.log(response)
      return response;
    });
};
//delete expense function
expense.destroy = function (id) {
  console.log("delete function called", id);

  return database
    .from("expenses")
    .where("id", id)
    .del()
    .then((response) => {
      return response;
    });
};
//get expense function
expense.get = function (id) {
  console.log("get function called");
};
//get all expenses function
expense.getAll = function () {
  return database
    .select()
    .from("expenses")
    .then((expenses) => {
      return expenses;
    });
};

export default expense;
