import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Outlet extends React.Component {
    constructor() {
        super();
        this.state = {
            outlet: [],
            isModalOpen: false,
            token: "",
            id_outlet: 0,
            alamat: "",
            telp: "",
            search: "",
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
        })
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"
        axios.get(url)
            .then(res => {
                this.setState({
                    outlet: res.data.outlet
                })
                console.log(this.state.outlet)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/outlet/" + id
        if (window.confirm("Are you sure to delete this outlet ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getOutlet()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findOutlet = (event) => {
        let url = "http://localhost:8080/outlet/find";
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
                    this.setState({ outlet: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_outlet: item.id_outlet,
            alamat: item.alamat,
            telp: item.telp,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            alamat: "",
            telp: "",
            action: "insert"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            alamat: this.state.alamat,
            telp: this.state.telp
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/outlet"
            axios.post(url, data)
                .then(res => {
                    this.getOutlet()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8080/outlet/" + this.state.id_outlet
            axios.put(url, data)
                .then(res => {
                    this.getOutlet()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getOutlet()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Outlet</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Outlet..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findOutlet} />

                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th>Outlet ID</th>
                                <th>Alamat</th>
                                <th>Telepon</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.outlet.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_outlet}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.telp}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_outlet)}><i className="fa fa-trash"></i></button>
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
                        <Modal.Title>Outlet</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan alamat outlet"
                                    value={this.state.alamat} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="telp">
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control type="text" name="telp" placeholder="Masukkan nomor telepon"
                                    value={this.state.telp} onChange={this.handleChange} />
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

export default Outlet;