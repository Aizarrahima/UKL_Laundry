import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

class Transaksi extends React.Component {
    constructor() {
        super();
        this.state = {
            transaksi: [],
            member: [],
            outlet: [],
            user: [],
            detail: [],
            isModalOpen: false,
            token: "",
            userName: "",
            id_transaksi: 0,
            id_member: 0,
            id_user: 0,
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            total: "",
            nama_member: "",
            nama_user: "",
            now: new Date(),
            // search: "",
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "kasir") {
                this.state.token = localStorage.getItem('token')
                this.state.role = localStorage.getItem('role')
                this.state.userName = localStorage.getItem('nama_user')
                this.state.id_transaksi = localStorage.getItem("id_transaksi")
                this.state.id_member = localStorage.getItem("id_member")
            }
        } else {
            window.location = '/signin'
        }
        this.state.id_user = localStorage.getItem("id")
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

    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi
                })
                console.log(this.state.transaksi)
            })
            .catch(error => {
                console.log(error)
            })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}-${Number(date.getMonth()) + 1}-${date.getFullYear()}`
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/transaksi/" + id
        if (window.confirm("Are you sure to delete this transaksi ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getTransaksi()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    detail = (id_transaksi) => {
        localStorage.setItem("id_transaksi", id_transaksi)
        let url = "http://localhost:8080/transaksi/detail/" + id_transaksi
        axios.get(url)
            .then(res => {
                this.setState({
                    detail: res.data.data
                })
                window.location = "/detail/" + id_transaksi
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleBayar = (id) => {
        let url = "http://localhost:8080/transaksi/bayar/" + id
        axios.put(url)
            .then(res => {
                console.log(res.data.message)
            })
    }

    // findTransaksi = (event) => {
    //     let url = "http://localhost:8080/transaksi/find";
    //     if (event.keyCode === 13) {
    //         // menampung data keyword pencarian
    //         let form = {
    //             find: this.state.search
    //         }
    //         // mengakses api untuk mengambil data pegawai
    //         // berdasarkan keyword
    //         axios.post(url, form)
    //             .then(response => {
    //                 // mengisikan data dari respon API ke array pegawai
    //                 this.setState({ transaksi: response.data.result });
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }

    handleEdit = (item) => {
        console.log({ item }, this.state)
        this.setState({
            isModalOpen: true,
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            total: item.total,
            action: "update"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            id_member: this.state.id_member,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            tgl_bayar: this.state.tgl_bayar,
            status: this.state.status,
            dibayar: this.state.dibayar,
            id_user: this.state.id_user,
            total: this.state.total,
        }
        console.log(data)
        let url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
        axios.put(url, data)
            .then(res => {
                this.getTransaksi()
                this.handleClose()
            })
            .catch(err => {
                console.log(err)
            })
    }

    getMember = () => {
        let url = "http://localhost:8080/member/"
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.member
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet/"
        axios.get(url)
            .then(res => {
                this.setState({
                    outlet: res.data.outlet
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getUser = () => {
        let url = "http://localhost:8080/user/"
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.user
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    componentDidMount() {
        this.getTransaksi()
        this.getMember()
        this.getOutlet()
        this.getUser()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Transaction</h1>
                    <div className="row">
                        {/* <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search transaksi..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findTransaksi} />
                        </div> */}
                        {this.state.role === "admin" &&
                            <div className="col-3 my-5">
                                <NavLink to="/member"><button className="btn btn-dark" id="blue"><i class="fa fa-plus me-2"></i> Add Transaction</button></NavLink>
                            </div>
                        }
                        {this.state.role === "kasir" &&
                            <div className="col-3 my-5">
                                <NavLink to="/member"><button className="btn btn-dark" id="blue">Add Transaction</button></NavLink>
                            </div>
                        }
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Transaksi ID</th>
                                <th>Member ID</th>
                                <th>User ID</th>
                                <th>Tanggal Transaksi</th>
                                <th>Batas Waktu</th>
                                <th>Tanggal Bayar</th>
                                <th>Status</th>
                                <th>Dibayar</th>
                                <th>Total</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transaksi.map((item, index) => {
                                return (
                                    <tr key={index} className="text-center">
                                        <td>{item.id_transaksi}</td>
                                        <td>{item.id_member}</td>
                                        <td>{item.id_user}</td>
                                        <td>{this.convertTime(item.tgl)}</td>
                                        <td>{this.convertTime(item.batas_waktu)}</td>
                                        {item.tgl_bayar !== null &&
                                            <td>{this.convertTime(item.tgl_bayar)}</td>
                                        }
                                        {item.tgl_bayar === null &&
                                            <td>{item.tgl_bayar}</td>
                                        }
                                        <td>
                                            {item.status === "baru" &&
                                                <Badge bg="danger">{item.status}</Badge>
                                            }
                                            {item.status === "proses" &&
                                                <Badge bg="warning">{item.status}</Badge>
                                            }
                                            {item.status === "selesai" &&
                                                <Badge bg="info">{item.status}</Badge>
                                            }
                                            {item.status === "diambil" &&
                                                <Badge bg="success">{item.status}</Badge>
                                            }
                                        </td>
                                        <td>
                                            {item.dibayar === "belum_dibayar" &&
                                                <Badge bg="danger">Belum Dibayar</Badge>
                                            }
                                            {item.dibayar === "dibayar" &&
                                                <Badge bg="success">Dibayar</Badge>
                                            }
                                        </td>
                                        <td>{item.total}</td>
                                        <td>
                                            {this.state.role === "admin" &&
                                                <span>
                                                    {item.status === "diambil" && item.dibayar === "dibayar" ? (<button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)} disabled><i className="fa fa-pencil"></i></button>) : (<button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>)}
                                                </span>
                                            }
                                            {this.state.role === "kasir" &&
                                                <span>
                                                    {item.status === "diambil" && item.dibayar === "dibayar" ? (<button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)} disabled><i className="fa fa-pencil"></i></button>) : (<button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>)}
                                                </span>
                                            }
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_transaksi)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.detail(item.id_transaksi)}><i class="fa fa-info"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>
                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Id Transaksi</Form.Label>
                                <Form.Control type="text" name="id_transaksi"
                                    value={this.state.id_transaksi} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="tgl">
                                <Form.Label>Tanggal Transaksi</Form.Label>
                                <Form.Control type="text" name="tgl"
                                    value={this.convertTime(this.state.tgl)} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="nama_member">
                                <Form.Label>Nama Member</Form.Label>
                                <Form.Control type="text" name="nama_member"
                                    value={this.state.member?.find(item => item.id_member === this.state.id_member)?.nama_member} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="pembayaran">
                                <Form.Label>Status Pembayaran</Form.Label>
                                <Form.Select type="text" name="dibayar" value={this.state.dibayar} onChange={this.handleChange} >
                                    <option value="" disabled selected></option>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum Dibayar</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="order">
                                <Form.Label>Order Status</Form.Label>
                                <Form.Select type="text" name="status" value={this.state.status} onChange={this.handleChange} >
                                    <option value="" disabled selected></option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">diambil</option>
                                </Form.Select>
                            </Form.Group>

                            {/* <hr />
                            <h3 className='mt-3 fw-bold text-center'>Detail Laundry</h3>
                            <table className="table table-bordered mb-3 mt-3">
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.detail_transaksi.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.paket.nama_paket}</td>
                                            <td>Rp {item.paket.harga}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">Rp {item.subtotal}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}

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

export default Transaksi;