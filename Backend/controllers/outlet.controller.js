"use strict"

// import express
const express = require("express");
const app = express();
app.use(express.json());

// database
const db = require("../database")

// endpoint
module.exports = {
    // menampilkan semua data
    getAll: (req, res) => {
        db.query(`select * from outlet`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: results,
            });
        });
    },

    // menampilkan data berdasarkan id
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from outlet where id_outlet = ${id}`, (err, results) => {
            const outlet = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: outlet,
            });
        });
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            alamat: req.body.alamat,
            telp: req.body.telp,
        };
        if (!data.alamat || !data.telp) {
            res.status(402).json({
                message: "alamat dan telepon harus diisi!",
            });
        }
        db.query(`insert into outlet set ?`, data, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added data",
                data: data,
            });
        });
    },

    // update data
    update: (req, res) => {
        const id = req.params.id;
        let data = {
            alamat: req.body.alamat,
            telp: req.body.telp
        }
        db.query(`update outlet set ? where id_outlet = ${id}`, data, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Succes update data",
                data,
            })
        })
    },

    // hapus data
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from outlet where id_outlet = ${id}`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: results,
            })
        })
    },

    // search
    find: (req, res) => {
        let find = req.body.find;
        let sql = "select * from outlet where alamat like '%" +
            find +
            "%' or id_outlet like '%" +
            find +
            "%' or telp like '%" +
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
    }
}
