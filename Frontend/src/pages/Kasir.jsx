import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Kasir extends React.Component {
    constructor() {
        super();
        this.state = {
            kasir: [],
            isModalOpen: false,
            token: "",
            id_kasir: 0,
            nama_kasir: "",
            username_kasir: "",
            password_kasir: "",
            search: "",
            isModalPw: false
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/login'
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
            isModalPw: false,
        })
    }

    getKasir = () => {
        let url = "http://localhost:8080/kasir"
        axios.get(url)
            .then(res => {
                this.setState({
                    kasir: res.data.data
                })
                console.log(this.state.kasir)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/kasir/" + id
        if (window.confirm("Are you sure to delete this kasir ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getKasir()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findKasir = (event) => {
        let url = "http://localhost:8080/kasir/find";
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
                    this.setState({ kasir: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_kasir: item.id_kasir,
            nama_kasir: item.nama_kasir,
            username_kasir: item.username_kasir,
            action: "update"
        })
    }

    handleEditPw = (item) => {
        this.setState({
            isModalPw: true,
            id_kasir: item.id_kasir,
            password_kasir: item.password_kasir
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            nama_kasir: "",
            username_kasir: "",
            password_kasir: "",
            action: "insert"
        })
    }

    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
            password_kasir: this.state.password_kasir
        }
        if (window.confirm("Are you sure to change password?")) {
            let url = "http://localhost:8080/kasir/update/" + this.state.id_kasir
            axios.put(url, data)
                .then(res => {
                    window.location = '/kasir'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_kasir: this.state.nama_kasir,
            username_kasir: this.state.username_kasir,
            password_kasir: this.state.password_kasir,
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/kasir/"
            axios.post(url, data)
                .then(res => {
                    this.getKasir()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/kasir/" + this.state.id_kasir
            axios.put(url, data)
                .then(res => {
                    this.getKasir()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getKasir()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Kasir</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Kasir..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findKasir} />

                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Kasir ID</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.kasir.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_kasir}</td>
                                        <td>{item.nama_kasir}</td>
                                        <td>{item.username_kasir}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_kasir)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEditPw(item)}>Password</button>
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
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama_kasir" placeholder="Input nama"
                                    value={this.state.nama_kasir} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username_kasir" placeholder="Input address"
                                    value={this.state.username_kasir} onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.action === "insert" &&
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password_kasir" value={this.state.password_kasir} placeholder="Masukkan password"
                                        onChange={this.handleChange} />
                                </Form.Group>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <Modal show={this.state.isModalPw} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Password</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSavePw(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password_kasir" value={this.state.password_kasir} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
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

export default Kasir;