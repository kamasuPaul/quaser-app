//create, update, delete, get, and get all incomes
import database from "./database";
import knex from "knex";

//income object
let income = {};

/**
 * add income to the incomes table
 * @param {*} income income details
 */
income.create = function (income) {
  let data = {
    amount: income.amount,
    category: income.category,
    date: income.date,
    reference_number: income.reference_number,
    description: income.description
  };
  return database
    .insert(data)
    .into("incomes")
    .then((res) => {
      data.id = res[0];
      return data;
    });
};

/**
 * update income details
 * @param {*} id id of income to be updated
 */
income.update = function (id, data) {
  console.log("update function called");
  console.log(data)
  return database
    .from("incomes")
    .where("id", id)
    .update(data)
    .then((response) => {
      console.log(response)
      return response;
    });
};
//delete income function
income.destroy = function (id) {
  console.log("delete function called", id);

  return database
    .from("incomes")
    .where("id", id)
    .del()
    .then((response) => {
      return response;
    });
};
//get income function
income.get = function (id) {
  console.log("get function called");
};
//get all incomes function
income.getAll = function () {
  return database
    .select()
    .from("incomes")
    .then((incomes) => {
      return incomes;
    });
};

export default income;
