"use strict";

// import
const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKLLAUNDRY"

// endpoint
module.exports = {
    // memanggil semua data
    getAll: (req, res) => {
        db.query(`select * from member`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: result
            })
        })
    },

    // memanggil data berdasarkan id
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from member where id_member = '${id}'`, (err, result) => {
            
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: result[0]
            })
        })
    },

    // menambahkan data
    add: (req, res) => {
        let data = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        };
        if (!data.nama_member, !data.alamat_member, !data.jenis_kelamin || !data.tlp) {
            res.status(402).json({
                message: "Nama, alamat, jenis kelamin, dan telepon harus diisi!",
            });
        }
        db.query(`insert into member set ?`, data, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added data",
                data: data
            })
        })
    },

    // mengubah data member
    update: (req, res) => {
        const id = req.params.id;
        let data = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        }
        db.query(`update member set ? where id_member = '${id}'`, data, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Success update data",
                data
            })
        })
    },

    // menghapus data
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from member where id_member = '${id}'`, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: result
            })
        })
    },

    // search
    find: (req, res) => {
        let find = req.body.find;
        let sql = "select * from member where nama_member like '%" +
            find +
            "%' or id_member like '%" +
            find +
            "%' or tlp like '%" +
            find +
            "%' or alamat_member like '%" +
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