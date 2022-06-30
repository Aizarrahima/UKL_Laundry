import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            userName: "",
            adminId: 0,
            id_admin: 0,
            nama_admin: "",
            username_admin: "",
            password_admin: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.adminId = localStorage.getItem('id')
            // this.state.userName = localStorage.getItem('nama')
        } else {
            window.location = '/signin'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAdmin = () => {
        let url = `http://localhost:8080/admin/${this.state.adminId}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                    admin: res.data.data
                })
            })
            .catch(error => {
                console.log(error);
            });
        console.log(this.state.admin)
    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            id_admin: this.state.admin.id_admin,
            nama_admin: this.state.admin.nama_admin,
            username_admin: this.state.admin.username_admin,
            password_admin: this.state.admin.password_admin
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_admin: this.state.nama_admin,
            username_admin: this.state.username_admin
        }

        axios.put(`http://localhost:8080/admin/${this.state.adminId}`, data)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getAdmin();
                this.handleClose()
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getAdmin()

    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container mb-4 mt-5">
                    <div className="row mt-2">
                        <div className="col-lg-15 col-xl-12">
                            <div className="card" id="card-profile">
                                <div className="card-body ms-3 me-3 mt-4">
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Admin ID</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="id_admin" class="form-control" value={this.state.adminId} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="nama_admin" class="form-control" value={this.state.admin.nama_admin} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Username</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="username_admin" class="form-control" value={this.state.admin.username_admin} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" name="password_admin" class="form-control" value={this.state.admin.password_admin} />
                                        </div>
                                    </div>
                                    <div className="col text-center mt-4 mb-4">
                                        <input type="submit" class="btn btn-dark" value="Edit Profile" id="blue" onClick={() => this.handleEdit()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama_admin" placeholder="Input name"
                                    value={this.state.nama_admin} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username_admin" placeholder="Input address"
                                    value={this.state.username_admin} onChange={this.handleChange} />
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

export default Profile;