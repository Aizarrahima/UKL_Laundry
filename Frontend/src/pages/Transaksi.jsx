import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Transaksi extends React.Component {
    constructor() {
        super();
        this.state = {
            transaksi: [],
            member: [],
            outlet: [],
            isModalOpen: false,
            token: "",
            adminName: "",
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
            // search: "",
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
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
                    transaksi: res.data.data
                })
                // console.log(this.state.transaksi)
            })
            .catch(error => {
                console.log(error)
            })
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

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            id_member: 0,
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            total: 0,
            action: "insert"
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
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/transaksi"
            axios.post(url, data)
                .then(res => {
                    this.getTransaksi()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
            axios.put(url, data)
                .then(res => {
                    this.getTransaksi()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    getMember = () => {
        let url = "http://localhost:8080/member/"
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.data
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
                    outlet: res.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // getUser = () => {
    //     let url = "http://localhost:8080/user/"
    //     axios.get(url)
    //         .then(res => {
    //             this.setState({
    //                 user: res.data.data
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    componentDidMount() {
        this.getTransaksi()
        this.getMember()
        this.getOutlet()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    {/* <h1 className="display-6 fw-light text-left">Transaksi { this.state.id_user}</h1> */}
                    <div className="row">
                        {/* <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search transaksi..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findTransaksi} />
                        </div> */}
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
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
                                    <tr key={index}>
                                        <td>{item.id_transaksi}</td>
                                        <td>{item.id_member}</td>
                                        <td>{item.id_user}</td>
                                        <td>{item.tgl}</td>
                                        <td>{item.batas_waktu}</td>
                                        <td>{ item.tgl_bayar}</td>
                                        <td>{item.status}</td>
                                        <td>{item.dibayar}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_transaksi)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this}>Pilih</button>
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
                        <Modal.Title>Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="nama_member">
                                <Form.Label>Member</Form.Label>
                                <Form.Select type="text" name="id_member" onChange={this.handleChange} >
                                    <option value={this.state.id_member}>{this.state.nama_member}</option>
                                    {this.state.member.map((item, index) => {
                                        return (
                                            <option value={item.id_member}>{item.nama_member}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="outlet">
                                <Form.Label>Outlet</Form.Label>
                                <Form.Select type="text" name="alamat" onChange={this.handleChange} >
                                    {this.state.action === "update" &&
                                        <option value={this.state.id_outlet}>{this.state.alamat}</option>
                                    }
                                    {this.state.outlet.map((item, index) => {
                                        return (
                                            <option value={item.id_outlet}>{item.alamat}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            {/* <Form.Group className="mb-2" controlId="nama_user">
                                <Form.Label>User</Form.Label>
                                <Form.Select type="text" name="id_member" onChange={this.handleChange} >
                                    <option value={this.state.id_member}>{this.state.nama_member}</option>
                                    {this.state.user.map((item, index) => {
                                        return (
                                            <option value={item.id_member}>{item.nama_member}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group> */}
                            <Form.Group className="mb-2" controlId="tgl">
                                <Form.Label>Tanggal Transaksi</Form.Label>
                                <Form.Control type="date" name="tgl" placeholder="Masukkan tanggal sekarang"
                                    value={this.state.tgl} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="batas_waktu">
                                <Form.Label>Batas Waktu</Form.Label>
                                <Form.Control type="date" name="batas_waktu" placeholder="Masukkan batas akhir pembayaran"
                                    value={this.state.batas_waktu} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Select type="text" name="status" onChange={this.handleChange} >
                                    <option value={this.state.status}>{this.state.status}</option>
                                    <option value="Baru">Baru</option>
                                    <option value="Proses">Proses</option>
                                    <option value="Selesai">Selesai</option>
                                    <option value="Diambil">Diambil</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="dibayar">
                                <Form.Label>Dibayar</Form.Label>
                                <Form.Select type="text" name="dibayar" onChange={this.handleChange} >
                                    <option value={this.state.dibayar}>{this.state.dibayar}</option>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum Dibayar</option>
                                </Form.Select>
                            </Form.Group>
                            {/* <Form.Group className="mb-2" controlId="total">
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="text" name="total" placeholder="Masukkan total yang harus dibayar"
                                    value={this.state.total} onChange={this.handleChange} />
                            </Form.Group> */}
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