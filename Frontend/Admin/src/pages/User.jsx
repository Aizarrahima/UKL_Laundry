import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            isModalOpen: false,
            token: "",
            id_user: 0,
            nama_user: "",
            username_user: "",
            password_user: "",
            role: "",
            search: "",
            isModalPw: false
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem("role") === "kasir" || localStorage.getItem("role") === "admin") {
                this.state.token = localStorage.getItem('token')
            } else {
                window.alert("You're not kasir or admin!")
                window.location = '/'
            }
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
            isModalPw: false,
        })
    }

    getUser = () => {
        let url = "http://localhost:8080/user"
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.user
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/user/" + id
        if (window.confirm("Are you sure to delete this user ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getUser()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findUser = (event) => {
        let url = "http://localhost:8080/user/find";
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
                    this.setState({ user: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_user: item.id_user,
            nama_user: item.nama_user,
            username_user: item.username_user,
            role: item.role,
            action: "update"
        })
    }

    handleEditPw = (item) => {
        this.setState({
            isModalPw: true,
            id_user: item.id_user,
            password_user: item.password_user
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            nama_user: "",
            username_user: "",
            password_user: "",
            role: "",
            action: "insert",
        })
    }

    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
            password_user: this.state.password_user
        }
        if (window.confirm("Are you sure to change password?")) {
            let url = "http://localhost:8080/user/update/" + this.state.id_user
            axios.put(url, data)
                .then(res => {
                    window.location = '/user'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_user: this.state.nama_user,
            username_user: this.state.username_user,
            password_user: this.state.password_user,
            role: this.state.role
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/user/"
            axios.post(url, data)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/user/" + this.state.id_user
            axios.put(url, data)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">User</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search user..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} />
                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_user}</td>
                                        <td>{item.nama_user}</td>
                                        <td>{item.username_user}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_user)}><i className="fa fa-trash"></i></button>
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
                            <Form.Group className="mb-2" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama_user" placeholder="Masukkan nama"
                                    value={this.state.nama_user} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username_user" value={this.state.username_user} placeholder="Masukkan username"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select type="text" name="role" onChange={this.handleChange} >
                                    <option value={this.state.role}>{this.state.role}</option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </Form.Select>
                            </Form.Group>
                            {this.state.action === "insert" &&
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
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
                                <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
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

export default User;