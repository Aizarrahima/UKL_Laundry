import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'



export default class Checkout extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            member: [],
            user: "",
            id_user: 0, // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
            isCart: false,
            tanggal_transaksi: null,
            now: new Date(),
            verification: 0
        }
        const moment = require('moment');
        this.state.tanggal_transaksi = moment(this.state.now).format('YYYY-MM-DD');

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
            this.state.id_user = localStorage.getItem('id')
        } else {
            window.location = '/signin'
        }

        this.state.verification = Math.random(1000, 10000000) * 100000000000000000
    }

    checkOut = () => {
        if (localStorage.getItem("cart") !== null) {
            let data = {
                id_user: this.state.id_user,
            }
            let detail = {
                id_transaksi: 0,
                id_paket: 0
            }
            let id_transaksi = 0
            axios.post("http://localhost:8080/transaksi/", data)
                .then(response => {
                    id_transaksi = response.data.id_transaksi
                    {
                        this.state.cart.map((item, index) => (
                            detail.id_transaksi = item.id_transaksi,
                            detail.id_paket = item.id_paket,
                            detail.qty = item.qty,
                            detail.subtotal = item.subtotal,

                            axios.post("http://localhost:8080/transaksi/addDetail", detail)
                                .then(response => {
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        ))
                    }
                    window.alert("Success Checkout")
                    localStorage.setItem("verification", this.state.verification)
                    localStorage.removeItem("cart")
                    this.initCart()
                    // window.location = `/payment/${detail.id_transaksi}`
                    window.location = "/transaksi"
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("name")
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    getMember = () => {
        let url = "http://localhost:8080/member/" + this.state.id_member
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.data
                })
                console.log(this.state.member)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.initCart()
        this.getMember()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-5 py-5" >
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-12 order-md-last">
                            <h5 id="t-dark">{this.state.member.nama_member}'s Bill</h5>

                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <h6 id="t-dark" className='mb-3 fw-normal'>Transaksi pada tanggal {this.state.tanggal_transaksi}</h6>
                                <span className="badge rounded-pill" id="blue">{this.state.cart.length}</span>
                            </h4>
                            <ul className="list-group ">
                                {this.state.cart.map((item, index) =>
                                (
                                    <li className="list-group-item d-flex justify-content-between lh-xl">
                                        <div>
                                            <h6 className="my-0">{item.jenis}</h6>
                                            {/* <span className="text-muted">{item.name} Category</span> */}
                                        </div>
                                        <span className="text-dark fst-normal">Rp {item.harga},00</span>
                                    </li>
                                ))}

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (Rp)</span>
                                    <strong>Rp {this.state.total},00</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <div>
                                        <h6 className="my-0">Payment</h6>
                                        <span className="text-muted"> Input this token verification to next step for payment!! : <b>{this.state.verification}</b></span>
                                    </div>
                                </li>
                            </ul>

                            <div className="card p-2">
                                <button className="btn btn-dark btn-lg w-100" id="blue" onClick={() => this.checkOut()}>Continue to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}