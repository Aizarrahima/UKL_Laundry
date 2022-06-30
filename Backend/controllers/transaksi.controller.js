"use strict";

// import express
const express = require("express")
const app = express()
app.use(express.json())
const moment = require("moment")

// database
const db = require("../database")

// endpoint
module.exports = {
    // menambahkan data transaksi sesuai tanggal hari ini
    add: (req, res) => {
        const now = new Date();
        const batas = new Date();
        batas.setDate(now.getDate() + 4)
        let data = {
            id_member: req.body.id_member,
            tgl: now,
            batas_waktu: batas,
            id_user: req.body.id_user,
            total: req.body.total,
        }
        db.query(`insert into transaksi set ?`, data, (err, result) => {
            if (err) {
                throw err
            } else {
                let id_transaksi = result.insertId;
                res.json({
                    message: "Berhasil menambahkan data",
                    id_transaksi,
                })
            }
        })
    },

    // menambahkan data detail transaksi
    addDetail: (req, res) => {
        let detail = {
            id_transaksi: req.body.id_transaksi,
            id_paket: req.body.id_paket,
            qty: req.body.qty,
            subtotal: req.body.subtotal,
        }
        db.query(`insert into detail_transaksi set ?`, detail, (error, results) => {
            if (error) {
                return error;
                // console.log(error)
            } else {
                return res.json({
                    message: "Berhasil menambahkan data",
                    results,
                })
            }
        })
    },

    // menampilkan semua data transaksi
    getTransaksi: (req, res) => {
        db.query(`select * from transaksi`, (err, result) => {
            if (err) throw err;
            const transaksi = result[0].tgl;
            const dateFormat = moment(transaksi).format("YYYY-MM-DD");
            res.json({
                message: "Data member",
                data: result,
                date: dateFormat,
            })
        })
    },

    // menampilkan data transasksi berdasarkan id_transaksi
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from transaksi where id_transaksi = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: results
            })
        })
    },

    // hapus data
    delete: (req, res) => {
        const id_transaksi = req.params.id_transaksi;
        db.query(`delete from transaksi where id_transaksi = '${id_transaksi}'`, (err, results) => {
            if (null, err) throw err;
            res.json({
                message: "Success delete data",
                data: results,
            })
        })
    },

    // bayar
    bayar: (req, res) => {
        const id = req.params.id_transaksi;
        const now = new Date();
        var date = moment(now).format("YYYY-MM-DD");
        let data = {
            tgl_bayar: date,
            dibayar: req.body.dibayar,
        }
        db.query(`update transaksi set ? where transaksi.id_transaksi = '${id}'`, data, (err, results) => {
            if (null) throw err;
            res.json({
                message: "Success update data",
                data: data
            })
        })
    },

    // update data
    update: (req, res) => {
        const id = req.params.id_transaksi;
        let data = {
            status: req.body.status,
            dibayar: req.body.dibayar,
        }
        if (req.body.dibayar === 'dibayar' && !req.body.tgl_bayar) {
            data.tgl_bayar = new Date();
        }
        db.query(`update transaksi set ? where transaksi.id_transaksi = '${id}'`, data, (err, result) => {
            if (null) throw err;
            res.json({
                message: "success update data",
                data: data
            })
        })
    }


}