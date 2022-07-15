"use strict";

// import
const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKLLAUNDRY"

// endpoint
module.exports = {
    // menampilkan semua user user
    getAll: (req, res) => {
        db.query(`select * from user`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua user",
                user: results
            });
        });
    },

    // menampilkan user berdasarkan id_user
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from user where id_user = '${id}'`, (err, results) => {
            const user = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan user",
                user: user
            });
        });
    },

    // menambahkan user
    add: (req, res) => {
        let user = {
            nama_user: req.body.nama_user,
            username_user: req.body.username_user,
            password_user: md5(req.body.password_user),
            role: req.body.role,
        };
        if (!user.nama_user, !user.username_user, !user.password_user || !user.role) {
            res.json({
                message: "Nama, Username, dan Password harus diisi!",
            });
        }
        db.query(`insert into user set ?`, user, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added user",
                user: user,
            })
        })
    },

    // update user 
    update: (req, res) => {
        const id = req.params.id;
        let user = {
            nama_user: req.body.nama_user,
            username_user: req.body.username_user,
            password_user: md5(req.body.password_user),
            role: req.body.role,
        };
        db.query(`update user set ? where id_user = ${id}`, user, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success update user",
                user: user
            });
        });
    },

    // hapus user
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from user where id_user = '${id}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete user",
                user: results,
            })
        })
    },

    // login
    login: (req, res) => {
        let username_user = req.body.username_user;
        let password_user = req.body.password_user;

        if (!username_user || !password_user)
            res.status(402).json({ message: "Username dan password harus diisi." });

        db.query(
            `select * from user where username_user = '${username_user}'`,
            (err, result) => {
                const user = result[0];
                if (typeof user === "undefined") {
                    res.status(401).json({ message: "User not fond" });
                } else {
                    if (user.password_user === md5(password_user)) {
                        const token = jwt.sign({ user: user }, SECRET_KEY);
                        res.json({
                            logged: true,
                            user: user,
                            token: token,
                        });
                    } else {
                        res.json({
                            message: "Invalid password",
                        });
                    }
                }
            }
        );
    },

    // search
    find: (req, res) => {
        let find = req.body.find;
        let sql = "select * from user where nama_user like '%" +
            find +
            "%' or id_user like '%" +
            find +
            "%' or username_user like '%" +
            find +
            "%' ";
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    result
                })
            }
        })
    },

    // update password berdasarkan username
    updatePw: (req, res) => {
        let username_user = req.body.username_user;
        let password_user = "";
        if (req.body.password_user) {
            password_user = md5(req.body.password_user);
        }
        db.query(`update user set password_user ='${password_user}' where username_user = '${username_user}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                user: results,
            })
        })
    },

    // update password berdasarkan id
    pwUser: (req, res) => {
        let id_user = req.params.id_user;
        let password_user = "";
        if (req.body.password_user) {
            password_user = md5(req.body.password_user);
        }
        let query = `update user set password_user = '${password_user}' where id_user = '${id_user}'`;
        db.query(query, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                user: results
            })
        })
    }
}