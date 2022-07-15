"use strict";

// import
const db = require("../database")

// endpoint
module.exports = {
    // memanggil semua member
    getAll: (req, res) => {
        db.query(`select * from member`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua member",
                member: result
            })
        })
    },

    // memanggil member berdasarkan id
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from member where id_member = '${id}'`, (err, result) => {
            
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan member",
                member: result[0]
            })
        })
    },

    // menambahkan member
    add: (req, res) => {
        let member = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        };
        if (!member.nama_member, !member.alamat_member, !member.jenis_kelamin || !member.tlp) {
            res.status(402).json({
                message: "Nama, alamat, jenis kelamin, dan telepon harus diisi!",
            });
        }
        db.query(`insert into member set ?`, member, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Success added member",
                member: member
            })
        })
    },

    // mengubah member member
    update: (req, res) => {
        const id = req.params.id;
        let member = {
            nama_member: req.body.nama_member,
            alamat_member: req.body.alamat_member,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        }
        db.query(`update member set ? where id_member = '${id}'`, member, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Success update member",
                member
            })
        })
    },

    // menghapus member
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from member where id_member = '${id}'`, (err, result) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete member",
                member: result
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