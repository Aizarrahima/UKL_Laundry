import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            isModalOpen: false,
            token: "",
            userName: "",
            id_user: 0,
            nama_user: "",
            username_user: "",
            password_user: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.id_user = localStorage.getItem('id')
            this.state.userName = localStorage.getItem('nama')
        } else {
            window.location = '/signin'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getUser = () => {
        let url = `http://localhost:8080/user/${this.state.id_user}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                    user: res.data.user
                })
            })
            .catch(error => {
                console.log(error);
            });
        console.log(this.state.user)
    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            id_user: this.state.user.id_user,
            nama_user: this.state.user.nama_user,
            username_user: this.state.user.username_user,
            password_user: this.state.user.password_user
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_user: this.state.nama_user,
            username_user: this.state.username_user
        }
        axios.put(`http://localhost:8080/user/${this.state.id_user}`, data)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getUser();
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
        this.getUser()

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
                                        <label className="col-sm-2 col-form-label fw-bold">User ID</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="id_user" class="form-control" value={this.state.id_user} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="nama_user" class="form-control" value={this.state.user.nama_user} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Username</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="username_user" class="form-control" value={this.state.user.username_user} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" name="password_user" class="form-control" value={this.state.user.password_user} />
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
                                <Form.Control type="text" name="nama_user" placeholder="Input name"
                                    value={this.state.nama_user} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username_user" placeholder="Input username"
                                    value={this.state.username_user} onChange={this.handleChange} />
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