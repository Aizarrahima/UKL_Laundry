import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Member extends React.Component {
    constructor() {
        super();
        this.state = {
            member: [],
            isModalOpen: false,
            token: "",
            id_member: 0,
            nama_member: "",
            alamat_member: "",
            jenis_kelamin: "",
            tlp: "",
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

    getMember = () => {
        let url = "http://localhost:8080/member"
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.member
                })
                console.log(this.state.member)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/member/" + id
        if (window.confirm("Are you sure to delete this member ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findMember = (event) => {
        let url = "http://localhost:8080/member/find";
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
                    this.setState({ member: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_member: item.id_member,
            nama_member: item.nama_member,
            alamat_member: item.alamat_member,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            nama_member: "",
            alamat_member: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert"
        })
    }

    handlePilih = (id) => {
        localStorage.setItem("id_member", id)
        window.location = "/paket"
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            nama_member: this.state.nama_member,
            alamat_member: this.state.alamat_member,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/member"
            axios.post(url, data)
                .then(res => {
                    this.getMember()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/member/" + this.state.id_member
            axios.put(url, data)
                .then(res => {
                    this.getMember()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getMember()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Member</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Member..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} />

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
                                <th>Member ID</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>Telepon</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.member.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_member}</td>
                                        <td>{item.nama_member}</td>
                                        <td>{item.alamat_member}</td>
                                        <td>{item.jenis_kelamin}</td>
                                        <td>{item.tlp}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_member)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handlePilih(item.id_member)}>Pilih</button>
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
                        <Modal.Title>Member</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="nama_member">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama_member" placeholder="Masukkan Nama"
                                    value={this.state.nama_member} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="alamat_member">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat_member" placeholder="Masukkan Alamat"
                                    value={this.state.alamat_member} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="jenis_kelamin">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                <Form.Select type="text" name="jenis_kelamin" onChange={this.handleChange} >
                                    <option value={this.state.jenis_kelamin}>{this.state.jenis_kelamin}</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="tlp">
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control type="text" name="tlp" placeholder="Masukkan nomor telepon"
                                    value={this.state.tlp} onChange={this.handleChange} />
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

export default Member;