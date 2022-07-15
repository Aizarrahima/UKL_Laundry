import React from "react";
import axios from "axios";
import { withRouter } from "./Withrouter";

class DetailTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail_transaksi: [],
            transaksi: [],
            member: [],
            user: [],
            outlet: [],
            token: "",
            role: "",
            nama: "",
            id_outlet: 0,
            id_transaksi: 0,
            id_member: 0,
            id_user: 0,
            action: "",
        }
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "kasir") {
                this.state.role = localStorage.getItem("role")
                this.state.token = localStorage.getItem("token")
                this.state.nama = localStorage.getItem("nama_user")
                this.state.id_transaksi = localStorage.getItem("id_transaksi")
                this.state.id_member = localStorage.getItem("id_member")
                this.state.id_user = localStorage.getItem("id")
            } else {
                window.alert("You are not an admin or a cashier")
                window.location = "/signin"
                localStorage.clear()
            }
        } else {
            window.location = "/signin"
        }
    }

    getDetail = () => {
        let url = `http://localhost:8080/transaksi/detail/${this.state.id_transaksi}`
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi,
                    detail_transaksi: res.data.transaksi[0]
                })
                window.print()
                console.log(this.state.transaksi)
            })
            .catch(error => [
                console.log(error)
            ])
    }

    getMember = () => {
        let url = `http://localhost:8080/member/${this.state.id_member}`
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

    getUser = () => {
        let url = `http://localhost:8080/user/${this.state.id_user}`
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

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}-${Number(date.getMonth()) + 1}-${date.getFullYear()}`
    }

    componentDidMount() {
        this.getDetail()
        this.getMember()
        this.getUser()
    }

    render() {
        return (
            <div>
                <div className="container my-5 py-5">
                    <h1 className="display-6 fw-bold mb-5 text-center">Invoice Laundry</h1>
                    <div className="row mb-4">
                        <div className="col-4">
                            <h6>Id Transaksi</h6>
                            <h6>Tanggal Transaksi</h6>
                            <h6>Batas Waktu</h6>
                            <h6>Tanggal Bayar</h6>
                            <h6>Status</h6>
                            <h6>Status Pembayaran</h6>
                            <h6>Nama Member</h6>
                            <h6>Telepon Member</h6>
                            <h6>Alamat Member</h6>
                            <h6>Nama User</h6>

                        </div>
                        <div className="col-6">
                            <h6 className="text-muted">{this.state.detail_transaksi.id_transaksi}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.detail_transaksi.tgl)}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.detail_transaksi.batas_waktu)}</h6>
                            {
                                this.state.detail_transaksi.tgl_bayar === null &&
                                <h6 className="text-danger">0/0/0</h6>
                            }
                            {
                                this.state.detail_transaksi.tgl_bayar !== null &&
                                <h6 className="text-muted">{this.convertTime(this.state.detail_transaksi.tgl_bayar)}</h6>
                            }
                            <h6 className="text-muted">{this.state.detail_transaksi.status}</h6>
                            {
                                this.state.detail_transaksi.dibayar === "dibayar" &&
                                <h6 className="text-muted"> Dibayar </h6>
                            }
                            {
                                this.state.detail_transaksi.dibayar === "belum_dibayar" &&
                                <h6 className="text-muted"> Belum dibayar </h6>
                            }
                            <h6 className="text-muted">{this.state.member.nama_member}</h6>
                            <h6 className="text-muted">{this.state.member.tlp}</h6>
                            <h6 className="text-muted">{this.state.member.alamat_member}</h6>
                            <h6 className="text-muted">{this.state.user.nama_user}</h6>
                        </div>
                    </div>

                    <table className="table table-bordered text-black">
                        <thead>
                            <tr>
                                <th>Paket</th>
                                <th>Qty</th>
                                <th>Harga</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.jenis}</td>
                                    <td>{item.qty}</td>
                                    <td>Rp {item.harga}</td>
                                    <td className="text-left">Rp {item.sub_total}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="align-self-end">Total</td>
                                <td className="text-left" colSpan={3}>Rp {this.state.detail_transaksi.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default withRouter(DetailTransaksi)