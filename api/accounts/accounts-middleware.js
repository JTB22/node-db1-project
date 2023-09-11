const db = require("../../data/db-config");
const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const userName = req.body.name;
  const userBudget = req.body.budget;
  console.log("username", userName, "budget", userBudget);
  if (!userName || !userBudget) {
    next({
      status: 400,
      message: "name and budget are required (must be a number)",
    });
  } else if (userName.trim().length < 3 || userName.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof userBudget !== "number" || isNaN(userBudget)) {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (userBudget < 0 || userBudget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    req.name = userName.trim();
    req.budget = userBudget;
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const name = req.name;
  db("accounts")
    .where("name", name.trim())
    .then((accounts) => {
      if (accounts.length > 0) {
        next({ status: 400, message: "that name is taken" });
      } else {
        next();
      }
    })
    .catch(next);
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  Accounts.getById(id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        next({ status: 404, message: "account not found" });
      }
    })
    .catch(next);
};
