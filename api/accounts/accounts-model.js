const db = require("../../data/db-config.js");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  const query = db("accounts");
  if (id) {
    return query.where("id", id).first();
  } else {
    return query;
  }
};

const create = (account) => {
  // DO YOUR MAGIC
  return db("accounts")
    .insert(account)
    .then(([id]) => getById(id));
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
  const query = db("accounts");
  return query
    .where("id", id)
    .update(account)
    .then(() => getById(id));
};

const deleteById = (id) => {
  // DO YOUR MAGIC
  const query = db("accounts");
  return query.where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
