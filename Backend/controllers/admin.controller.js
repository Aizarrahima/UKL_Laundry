"use strict";

// import
const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKLLAUNDRY"

// endpoint
module.exports = {
    // menampilkan semua data admin
    getAll: (req, res) => {
        db.query(`select * from admin`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: results
            });
        });
    },

    // menampilkan data berdasarkan id_admin
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from admin where id_admin = '${id}'`, (err, results) => {
            const admin = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: admin
            });
        });
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            nama_admin: req.body.nama_admin,
            username_admin: req.body.username_admin,
            password_admin: md5(req.body.password_admin),
        };
        if (!data.nama_admin, !data.username_admin || !data.password_admin) {
            res.json({
                message: "Nama, Username, dan Password harus diisi!",
            });
        }
        db.query(`insert into admin set ?`, data, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added data",
                data: data,
            })
        })
    },

    // update data 
    update: (req, res) => {
        const id = req.params.id;
        let data = {
            nama_admin: req.body.nama_admin,
            username_admin: req.body.username_admin,
            password_admin: md5(req.body.password_admin)
        };
        db.query(`update admin set ? where id_admin = ${id}`, data, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success update data",
                data: data
            });
        });
    },

    // hapus data
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from admin where id_admin = '${id}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: results,
            })
        })
    },

    // login
    login: (req, res) => {
        let username_admin = req.body.username_admin;
        let password_admin = req.body.password_admin;

        if (!username_admin || !password_admin)
            res.status(402).json({ message: "Username dan password harus diisi." });

        db.query(
            `select * from admin where username_admin = '${username_admin}'`,
            (err, result) => {
                const admin = result[0];
                if (typeof admin === "undefined") {
                    res.status(401).json({ message: "User not fond" });
                } else {
                    if (admin.password_admin === md5(password_admin)) {
                        const token = jwt.sign({ data: admin }, SECRET_KEY);
                        res.json({
                            logged: true,
                            data: admin,
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
        let sql = "select * from admin where nama_admin like '%" +
            find +
            "%' or id_admin like '%" +
            find +
            "%' or username_admin like '%" +
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
        let username_admin = req.body.username_admin;
        let password_admin = "";
        if (req.body.password_admin) {
            password_admin = md5(req.body.password_admin);
        }
        db.query(`update admin set password_admin ='${password_admin}' where username_admin = '${username_admin}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results,
            })
        })
    },

    // update password berdasarkan id
    pwAdmin: (req, res) => {
        let id_admin = req.params.id_admin;
        let password_admin = "";
        if (req.body.password_admin) {
            password_admin = md5(req.body.password_admin);
        }
        let query = `update admin set password_admin = '${password_admin}' where id_admin = '${id_admin}'`;
        db.query(query, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results
            })
        })
    }
}