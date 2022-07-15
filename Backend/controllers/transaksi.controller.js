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
        let transaksi = {
            id_member: req.body.id_member,
            tgl: now,
            batas_waktu: batas,
            id_user: req.body.id_user,
            total: req.body.total,
        }
        db.query(`insert into transaksi set ?`, transaksi, (err, result) => {
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
            sub_total: req.body.sub_total,
        }
        db.query(`insert into detail_transaksi set ?`, detail, (error, results) => {
            if (error) {
                throw error;
            } else {
                res.json({
                    message: "Berhasil menambahkan data",
                    detail,
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
                message: "Data transaksi",
                transaksi: result,
                date: dateFormat,
            })
        })
    },

    // menampilkan data transaksi berdasarkan id_transaksi
    getId: (req, res) => {
        const id_transaksi = req.params.id_transaksi
        db.query(`select * from transaksi where id_transaksi = '${id_transaksi}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                transaksi: results
            })
        })
    },

    // memanggil data detail_transaksi
    getDetail: (req, res) => {
        const id_transaksi = req.params.id_transaksi
        db.query(`select * from transaksi join detail_transaksi on transaksi.id_transaksi = detail_transaksi.id_transaksi join paket on detail_transaksi.id_paket = paket.id_paket where detail_transaksi.id_transaksi = ${id_transaksi}`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "Data detail transaksi",
                transaksi: result
            })
        })
    },

    laporan: (req, res) => {
        db.query(`select * from transaksi LEFT join detail_transaksi on transaksi.id_transaksi = detail_transaksi.id_transaksi join paket on detail_transaksi.id_paket = paket.id_paket join member on transaksi.id_member = member.id_member join user on transaksi.id_user = user.id_user GROUP BY detail_transaksi.id_transaksi;`, (err, result) => {
            if (err) throw err;
            res.json({
                message: "laporan",
                laporan: result
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
                transaksi: results,
            })
        })
    },

    // update data
    update: (req, res) => {
        const id = req.params.id_transaksi;
        let transaksi = {
            status: req.body.status,
            dibayar: req.body.dibayar,
        }
        if (req.body.dibayar === 'dibayar' && !req.body.tgl_bayar) {
            transaksi.tgl_bayar = new Date();
        }
        db.query(`update transaksi set ? where transaksi.id_transaksi = '${id}'`, transaksi, (err, result) => {
            if (null) throw err;
            res.json({
                message: "success update data",
                transaksi: transaksi
            })
        })
    }


}