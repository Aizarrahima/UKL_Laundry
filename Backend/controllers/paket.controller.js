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
        db.query(`select * from paket`, (err, results) => {
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
        db.query(`select * from paket where id_paket = ${id}`, (err, results) => {
            const paket = results[0];
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: paket,
            });
        });
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            jenis: req.body.jenis,
            harga: req.body.harga,
        };
        if (!data.jenis || !data.harga) {
            res.status(402).json({
                message: "Jenis dan Harga harus diisi!",
            });
        }
        db.query(`insert into paket set ?`, data, (err, result) => {
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
            jenis: req.body.jenis,
            harga: req.body.harga
        }
        db.query(`update paket set ? where id_paket = ${id}`, data, (err, result) => {
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
        db.query(`delete from paket where id_paket = ${id}`, (err, results) => {
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
        let sql = "select * from paket where jenis like '%" +
            find +
            "%' or id_paket like '%" +
            find +
            "%' or harga like '%" +
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
