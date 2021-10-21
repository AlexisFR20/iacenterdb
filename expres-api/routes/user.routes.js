module.exports = app => {
    const users = require('../controllers/user.controller');

    // Get, list of users
    app.get("/users", users.getAll);

    // Get, single user
    app.get("/user/:userId", users.getSingle);
    // /:userId con esto exprss ya sabe que se recibira una variable

    // Create user
    app.post("/user", users.create);

    // Update user
    app.put("/user", users.update);
};