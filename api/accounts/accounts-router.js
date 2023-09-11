const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    const newAccount = { name: req.name, budget: req.budget };
    Accounts.create(newAccount)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch(next);
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then((updatedAccount) => {
      res.json(updatedAccount);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.json(req.account);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something bad inside the accounts router!",
  });
});

module.exports = router;
