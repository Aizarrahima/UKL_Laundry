import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Paket extends React.Component {
    constructor() {
        super();
        this.state = {
            paket: [],
            isModalOpen: false,
            token: "",
            id_paket: 0,
            jenis: "",
            harga: "",
            search: "",
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false,
        })
    }

    getPaket = () => {
        let url = "http://localhost:8080/paket"
        axios.get(url)
            .then(res => {
                this.setState({
                    paket: res.data.paket
                })
                console.log(this.state.paket)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/paket/" + id
        if (window.confirm("Are you sure to delete this paket ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findPaket = (event) => {
        let url = "http://localhost:8080/paket/find";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ paket: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_paket: item.id_paket,
            jenis: item.jenis,
            harga: item.harga,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            jenis: "",
            harga: "",
            action: "insert"
        })
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []

        // cek eksistensi dari data cart pada localstorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
        if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.jenis}`)
        }
        else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.jenis}`, "")
            if (promptJumlah !== null && promptJumlah !== "") {
                // jika user memasukkan jumlah item yang dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                selectedItem.sub_total = selectedItem.harga * promptJumlah
                // masukkan item yang dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            jenis: this.state.jenis,
            harga: this.state.harga
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/paket"
            axios.post(url, data)
                .then(res => {
                    this.getPaket()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/paket/" + this.state.id_paket
            axios.put(url, data)
                .then(res => {
                    this.getPaket()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getPaket()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Paket</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search paket..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findPaket} />

                        </div>
                        {this.state.role === "admin" &&
                            <div className="col-3 mt-5">
                                <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                            </div>
                        }
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th>Paket ID</th>
                                <th>Jenis</th>
                                <th>Harga</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.paket.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_paket}</td>
                                        <td>{item.jenis}</td>
                                        <td>{item.harga}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_paket)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.addToCart(item)} >Pilih</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>
                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Paket</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="jenis">
                                <Form.Label>Jenis Laundry</Form.Label>
                                <Form.Select type="text" name="jenis"  onChange={this.handleChange} >
                                    <option value={this.state.jenis}>{this.state.jenis}</option>
                                    <option value="kiloan">Kiloan</option>
                                    <option value="selimut">Selimut</option>
                                    <option value="bed_cover">Bed Cover</option>
                                    <option value="kaos">Kaos</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="harga">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control type="text" name="harga" placeholder="Masukkan harga per kg"
                                    value={this.state.harga} onChange={this.handleChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Paket;