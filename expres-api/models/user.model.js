const sql = require("./db");

const User = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.location = user.location;
    this.phone = user.phone;
    this.gender = user.gender;
    this.createdAt = user.createdAt || null;
    this.updatedAt = user.updatedAt || null;
};

User.getAll = result => {
    sql.query("SELECT * FROM User", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.getSingle = (userId, result) => {
    sql.query("SELECT * FROM User WHERE userName=?", userId, (err, res) => {

        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.create = (user, result) => {
    console.log("CREATE USER:", user.firstName);
    console.log(user);

    sql.query("INSERT INTO user SET ?", user,
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);

        }
    );
};

User.update = (userId, user, result) => {
    sql.query("UPDATE users SET firstName=?, lastName=?, location=?, phone=?, gender=? WHERE id=?", [
            user.firstName,
            user.lastName,
            user.location,
            user.phone,
            user.gender,
            userId
        ],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        }
    );
};

module.exports = User;