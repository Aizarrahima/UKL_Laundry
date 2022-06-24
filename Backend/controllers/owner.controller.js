"use strict";

// import
const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKLLAUNDRY"

// endpoint
module.exports = {
    // menampilkan semua data owner
    getAll: (req, res) => {
        db.query(`select * from owner`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: results
            });
        });
    },

    // menampilkan data berdasarkan id_owner
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from owner where id_owner = '${id}'`, (err, results) => {
            const owner = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: owner
            });
        });
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            nama_owner: req.body.nama_owner,
            username_owner: req.body.username_owner,
            password_owner: md5(req.body.password_owner),
        };
        if (!data.nama_owner, !data.username_owner || !data.password_owner) {
            res.json({
                message: "Nama, Username, dan Password harus diisi!",
            });
        }
        db.query(`insert into owner set ?`, data, (err, result) => {
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
            nama_owner: req.body.nama_owner,
            username_owner: req.body.username_owner,
            password_owner: md5(req.body.password_owner)
        };
        db.query(`update owner set ? where id_owner = ${id}`, data, (err, result) => {
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
        db.query(`delete from owner where id_owner = '${id}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: results,
            })
        })
    },

    // login
    login: (req, res) => {
        let username_owner = req.body.username_owner;
        let password_owner = req.body.password_owner;

        if (!username_owner || !password_owner)
            res.status(402).json({ message: "Username dan password harus diisi." });

        db.query(
            `select * from owner where username_owner = '${username_owner}'`,
            (err, result) => {
                const owner = result[0];
                if (typeof owner === "undefined") {
                    res.status(401).json({ message: "User not fond" });
                } else {
                    if (owner.password_owner === md5(password_owner)) {
                        const token = jwt.sign({ data: owner }, SECRET_KEY);
                        res.json({
                            logged: true,
                            data: owner,
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
        let sql = "select * from owner where nama_owner like '%" +
            find +
            "%' or id_owner like '%" +
            find +
            "%' or username_owner like '%" +
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
        let username_owner = req.body.username_owner;
        let password_owner = "";
        if (req.body.password_owner) {
            password_owner = md5(req.body.password_owner);
        }
        db.query(`update owner set password_owner ='${password_owner}' where username_owner = '${username_owner}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results,
            })
        })
    },

    // update password berdasarkan id
    pwOwner: (req, res) => {
        let id_owner = req.params.id_owner;
        let password_owner = "";
        if (req.body.password_owner) {
            password_owner = md5(req.body.password_owner);
        }
        let query = `update owner set password_owner = '${password_owner}' where id_owner = '${id_owner}'`;
        db.query(query, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Berhasil ubah password",
                data: results
            })
        })
    }
}