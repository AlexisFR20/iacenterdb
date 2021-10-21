const { restart } = require("nodemon");
const User = require("../models/user.model");

exports.getAll = (req, res) => {
    // Aqui se coloca los metodos para la manipulacion de los
    // datos
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all users"
            });
        } else {
            console.log("Hubo conexion");
            res.status(200).send(data);
            // por default, cunado funciona devuleve un status 200
        }
    });

};

exports.getSingle = (req, res) => {
    // Aqui se coloca los metodos para la manipulacion de los
    // datos
    console.log(!req.params.userId);
    if (!req.params.userId) {
        res.status(400).send({
            message: "Error: user id not specified"
        })
    }
    User.getSingle(req.params.userId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "Server error getting all users"
            });
        } else {
            if (data.length) {
                // Aqui se puede inicializar validaciones o realziar operaciones
                res.status(200).send(data);
                // si encontro algo mandarlo o regresarlo
            } else {
                // si no encontro manar error 404
                res.status(404).send({
                    mesagge: "user not found"
                });
            }
        }
    });
};

exports.create = (req, res) => {
    // Aqui se coloca los metodos para la manipulacion de los
    // datos
    // if (!req.body.length) {
    //     res.send(400).send({
    //         message: "You must include the data to be saved"
    //     });
    // }

    // if (!req.body.firstName) {
    //     res.send(400).send({
    //         message: "Falta el primer nombre"
    //     });
    // }
    User.create(new User(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "server error creating user"
            });
        } else {
            res.status(200).send({
                message: "user created succesfully",
                userId: data.insertId
            });
        }
    });
    // como ya hay un constructor y trabajara en base a el
    // ya estan predispuestos los valores que se recibiran
    // reduciendo errores
    // Es por eso que solo se manda el req.body

    // res.status(200).send({
    //     "status": "success",
    //     "req": req.body
    // });
};

exports.update = (req, res) => {
    // if (!req.body.length) {
    //     res.send(400).send({
    //         message: "You must include the data to be saved"
    //     });
    // }
    // if (!req.body.id) {
    //     res.send(400).send({
    //         message: "Falta el id"
    //     });
    // }

    // if (!req.body.firstName) {
    //     res.send(400).send({
    //         message: "Falta el primer nombre"
    //     });
    // }


    User.update(req.body.id, new User(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.mesagge || "server error updating user"
            });
        } else {
            User.getSingle(req.body.id, (err2, data2) => {
                res.send({
                    message: "user updated succesfully",
                    user: data2
                });
            });
        }
    });
    // res.status(200).send({
    //     "status": "success"
    // });
};



// AL FINALIZAR EL API….
// Para subir un api creada, solo basta con copiar el archive del api creada a el servidor