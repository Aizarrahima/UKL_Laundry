import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: [],
            member: [],
            isCart: false,
            id_member: 0,
            id_user: 0,
            tgl: 0,
            batas_waktu: 0,
            tgl_bayar: 0,
            status: "",
            dibayar: "",
            total: 0,
            id_transaksi: 0,
            id_paket: 0,
            harga: 0,
            qty: 0,
            subtotal: 0,
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
        }

        this.state.id_member = localStorage.getItem("id_member")
        this.state.userName = localStorage.getItem("nama")
        this.state.id_user = localStorage.getItem("id")
        // this.state.total = localStorage.getItem("total")
        // console.log(this.state.total)
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

    Drop = (selectedItem) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Do you want to delete this class from your cart")) {
            // menghapus data
            let tempCart = this.state.cart
            // posisi index data yg akan dihapus
            let index = tempCart.indexOf(selectedItem)
            // hapus data
            tempCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(tempCart))
            this.setState({ cart: tempCart })
        }
    }

    Edit = (selectedItem) => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(item => item.id_paket === selectedItem.id_paket)
        let promptJumlah = window.prompt(`Masukkan Jumlah ${selectedItem.jenis} yang dibeli`, selectedItem.qty)
        if (promptJumlah === null || promptJumlah === "" || promptJumlah === "0") {
            window.alert("Qty cannot be null")
        } else {
            tempCart[index].qty = promptJumlah
            tempCart[index].subtotal = promptJumlah * tempCart[index].harga
        }
        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))
        // refresh cart
        this.initCart()
    }

    checkOut = () => {
        if (localStorage.getItem("cart") !== null) {
            let transaksi = {
                id_user: this.state.id_user,
                id_member: this.state.id_member,
                batas_waktu: this.state.batas_waktu,
                tgl_bayar: this.state.tgl_bayar,    
                status: this.state.status,
                dibayar: this.state.dibayar,
                total: this.state.total,
            }
            let detail = {
                id_transaksi: 0,
                id_paket: 0,
                qty: 0,
                subtotal: 0,
            }
            let id_transaksi = 0
            let url_transaksi = "http://localhost:8080/transaksi/"
            let url_detail = "http://localhost:8080/transaksi/addDetail"
            axios.post(url_transaksi, transaksi)
                .then(response => {
                    id_transaksi = response.data.id_transaksi
                    {
                        this.state.cart.map((item, index) => (
                            detail.id_paket = item.id_paket,
                            detail.id_transaksi = id_transaksi,
                            detail.qty = item.qty,  
                            detail.subtotal = item.subtotal,
                            
                            axios.post(url_detail, detail)
                                .then(response => {
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        ))
                    }
                    window.alert("Success Checkout")
                    // localStorage.setItem("verification", this.state.verification)
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

    getUser = () => {
        let url = "http://localhost:8080/user/" + this.state.id_user
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.data
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.initCart()
        this.getMember()
        this.getUser()
    }

    render() {
        return (
            // <div>
            //     <Navbar />
            //     {this.state.cart.length > 0 &&
            //         <div>
            //             <div className="container py-4 my-4">
            //                 <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.user}</h1>
            //                 <h1 className="display-6 fw-bold text-left">Here's your cart</h1>
            //                 {this.state.cart.map((item, index) =>
            //                 (
            //                     <div className="px-4 my-5 bg-white rounded-3" key={item.id_paket}>
            //                         <div className="container py-4">
            //                             <div className="row justify-content-center">
            //                                 <div className="col-md-4">
            //                                     {/* <img src={"http://localhost:8000/image/class/" + item.image_class} alt={item.name_class} id="img-cart" /> */}
            //                                 </div>
            //                                 <div className="col-md-4">
            //                                     <h3 id="text-blue">{item.jenis}</h3>
            //                                     <p className="lead fw-bold">
            //                                         {item.qty}</p>
            //                                     <p className="lead fw-bold">
            //                                         {item.harga * item.qty}</p>
            //                                     <button className='btn btn-dark' id="blue" onClick={() => this.Drop(item)}>Delete</button>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <hr />
            //                     </div>
            //                 ))}

            //             </div>
            //             <div className="container">
            //                 <div className="row">
            //                     <NavLink to="/checkout" className="btn btn-dark mb-5 w-25 mx-auto" id="blue">Checkout</NavLink>
            //                 </div>
            //             </div>
            //         </div>
            //     }

            //     {this.state.cart.length === 0 &&
            //         <div className="container py-4 my-4">
            //             <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.user}</h1>

            //             <h1 className="display-6 fw-bold text-left">Your cart is empty</h1>
            //         </div>
            //     }
            // </div>

            <div>
                <Navbar />
                {this.state.cart.length > 0 &&
                    <div>
                        <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.userName}</h1>
                        <h1 className="display-6 fw-bold text-left">Here's your cart</h1>
                        <div className="row">
                            <div className="col-3">
                                <h6>Nama Member</h6>
                                <h6>Alamat Member</h6>
                                <h6>Jenis Kelamin</h6>
                                <h6>Nomor Telepon</h6>
                            </div>

                            <div className="col-9">
                                <h6>{this.state.member.nama_member}</h6>
                                <h6>{this.state.member.alamat_member}</h6>
                                <h6>{this.state.member.jenis_kelamin}</h6>
                                <h6>{this.state.member.tlp}</h6>
                            </div>
                        </div>
                        {this.state.cart.map((item, index) => (
                            <div className="px-4 my-5 bg-white rounded-3" key={item.id_paket}>
                                <div>
                                    <div className="container py-4">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <h3>Jenis Laundry</h3>
                                                <p className='lead fw-bold'>Qty</p>
                                                <p className='lead fw-bold'>Total</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h3 id="text-blue">{item.jenis}</h3>
                                                <p className="lead fw-bold">
                                                    {item.qty}</p>
                                                <p className="lead fw-bold">
                                                    {item.harga * item.qty}</p>
                                                <button className='btn btn-dark px-3 py-2' id="blue" onClick={() => this.Drop(item)}>Delete</button>
                                                <button className='btn btn-dark px-3 py-2' id="blue" onClick={() => this.Edit(item)}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="container">
                                        <div className="row">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => this.checkOut()} className="btn btn-dark mb-5 w-25 mx-auto" id="blue">Checkout</button>
                    </div>
                }
                {this.state.cart.length === 0 &&
                    <div className="container py-4 my-4">
                        <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.user}</h1>
                        <h1 className="display-6 fw-bold text-left">Your cart is empty</h1>
                    </div>
                }
            </div>
        );
    }
}

export default Cart;