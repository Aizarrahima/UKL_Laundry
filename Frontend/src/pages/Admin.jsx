import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            id_admin: 0,
            nama_admin: "",
            username_admin: "",
            password_admin: "",
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

    getAdmin = () => {
        let url = "http://localhost:8080/admin"
        axios.get(url)
            .then(res => {
                this.setState({
                    admin: res.data.data
                })
                console.log(this.state.admin)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/admin/" + id
        if (window.confirm("Are you sure to delete this admin ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getAdmin()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findAdmin = (event) => {
        let url = "http://localhost:8080/admin/find";
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
                    this.setState({ admin: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_admin: item.id_admin,
            nama_admin: item.nama_admin,
            img_admin: item.img_admin,
            username_admin: item.username_admin,
            action: "update"
        })
    }

    handleEditPw = (item) => {
        this.setState({
            isModalPw: true,
            id_admin: item.id_admin,
            password_admin: item.password_admin
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            nama_admin: "",
            img_admin: null,
            username_admin: "",
            password_admin: "",
            action: "insert"
        })
    }

    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
            password_admin: this.state.password_admin
        }
        if (window.confirm("Are you sure to change password?")) {
            let url = "http://localhost:8080/admin/update/" + this.state.id_admin
            axios.put(url, data)
                .then(res => {
                    window.location = '/admin'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_admin: this.state.nama_admin,
            username_admin: this.state.username_admin,
            password_admin: this.state.password_admin,
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/admin/"
            axios.post(url, data)
                .then(res => {
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/admin/" + this.state.id_admin
            axios.put(url, data)
                .then(res => {
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getAdmin()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Admin</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Admin..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findAdmin} />
                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Admin ID</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admin.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_admin}</td>
                                        <td>{item.nama_admin}</td>
                                        <td>{item.username_admin}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_admin)}><i className="fa fa-trash"></i></button>
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
                                <Form.Control type="text" name="nama_admin" placeholder="Masukkan nama"
                                    value={this.state.nama_admin} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username_admin" value={this.state.username_admin} placeholder="Masukkan username"
                                onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.action === "insert" &&
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password_admin" value={this.state.password_admin} placeholder="Masukkan password"
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
                                <Form.Control type="password" name="password_admin" value={this.state.password_admin} placeholder="Masukkan password"
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

export default Admin;