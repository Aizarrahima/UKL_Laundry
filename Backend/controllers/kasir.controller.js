"use strict";

// import
const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKLLAUNDRY"

// endpoint
module.exports = {
    // menampilkan semua data kasir
    getAll: (req, res) => {
        db.query(`select * from kasir`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: results
            });
        });
    },

    // menampilkan data berdasarkan id_kasir
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from kasir where id_kasir = '${id}'`, (err, results) => {
            const kasir = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: kasir
            });
        });
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            nama_kasir: req.body.nama_kasir,
            username_kasir: req.body.username_kasir,
            password_kasir: md5(req.body.password_kasir),
        };
        if (!data.nama_kasir, !data.username_kasir || !data.password_kasir) {
            res.json({
                message: "Nama, Username, dan Password harus diisi!",
            });
            db.query(`insert into kasir set ?`, data, (err, result) => {
                if (err) throw err;
                res.json({
                    message: "Success added data",
                    data: data,
                })
            })
        }
    },

    // update data 
    update: (req, res) => {
        const id = req.params.id;
        let data = {
            nama_kasir: req.body.nama_kasir,
            username_kasir: req.body.username_kasir,
            password_kasir: md5(req.body.password_kasir)
        };
        db.query(`update kasir set ? where id_kasir = ${id}`, data, (err, result) => {
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
        db.query(`delete from kasir where id_kasir = '${id}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: results,
            })
        })
    },

    // login
    login: (req, res) => {
        let username_kasir = req.body.username_kasir;
        let password_kasir = req.body.password_kasir;

        if (!username_kasir || !password_kasir)
            res.status(402).json({ message: "Username dan password harus diisi." });

        db.query(
            `select * from kasir where username_kasir = '${username_kasir}'`,
            (err, result) => {
                const kasir = result[0];
                if (typeof kasir === "undefined") {
                    res.status(401).json({ message: "User not fond" });
                } else {
                    if (kasir.password_kasir === md5(password_kasir)) {
                        const token = jwt.sign({ data: kasir }, SECRET_KEY);
                        res.json({
                            logged: true,
                            data: kasir,
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
        let sql = "select * from kasir where nama_kasir like '%" +
            find +
            "%' or id_kasir like '%" +
            find +
            "%' or username_kasir like '%" +
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
        let username_kasir = req.body.username_kasir;
        let password_kasir = "";
        if (req.body.password_kasir) {
            password_kasir = md5(req.body.password_kasir);
        }
        db.query(`update kasir set password_kasir ='${password_kasir}' where username_kasir = '${username_kasir}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results,
            })
        })
    },

    // update password berdasarkan id
    pwKasir: (req, res) => {
        let id_kasir = req.params.id_kasir;
        let password_kasir = "";
        if (req.body.password_kasir) {
            password_kasir = md5(req.body.password_kasir);
        }
        let query = `update kasir set password_kasir = '${password_kasir}' where id_kasir = '${id_kasir}'`;
        db.query(query, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results
            })
        })
    }
}