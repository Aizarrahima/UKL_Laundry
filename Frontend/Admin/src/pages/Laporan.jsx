import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

class Laporan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laporanTransaksi: [],
            laporanDetail: [],
            id_transaksi: 0,
            token: "",
            role: "",
            nama: "",
        }
        if (localStorage.getItem("token")) {
            this.state.role = localStorage.getItem("role")
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/signin"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    laporanTransaksi = () => {
        let url = `http://localhost:8080/transaksi/laporan/`
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    laporanTransaksi: res.data.laporan
                })
                console.log(this.state.laporanTransaksi)
            })
            .catch(error => [
                console.log(error)
            ])
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}-${Number(date.getMonth()) + 1}-${date.getFullYear()}`
    }

    componentDidMount() {
        this.laporanTransaksi()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-3 py-3 table-responsive">
                    <br /><br />
                    <h1 className="display-6 fw-bold mb-5">Laporan</h1>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Id Transaksi</th>
                                <th>Tanggal Transaksi</th>
                                <th>Nama Member</th>
                                <th>Nama User</th>
                                <th>Telepon Member</th>
                                <th>Alamat Member</th>
                                {/* <th>Paket</th>
                                <th>Qty</th>
                                <th>Harga</th>
                                <th>Sub Total</th> */}
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.laporanTransaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id_transaksi}</td>
                                    <td>{this.convertTime(item.tgl)}</td>
                                    <td>{item.nama_member}</td>
                                    <td>{item.nama_user}</td>
                                    <td>{item.tlp}</td>
                                    <td>{item.alamat_member}</td>
                                    {/*<td>
                                        <ol>
                                            {item.state.map((item, index) => {
                                                return (
                                                    <li>{index + 1}. {item.jenis}</li>
                                                )
                                            })} 
                                        </ol>
                                    </td>
                                     <td>
                                        <ol>
                                             {item.laporanTransaksi.map((item, index) => {
                                                return ( 
                                            <li>{item.qty}</li>
                                             )
                                             })} 
                                        </ol>
                                    </td>
                                    <td>
                                        <ol>
                                            {item.laporanTransaksi.map((item, index) => {
                                                return ( 
                                            <li>Rp{item.harga}</li>
                                             )
                                             })} 
                                        </ol>
                                    </td>
                                    <td>
                                        <ol>
                                             {this.state.laporanTransaksi.map((item, index) => {
                                                return ( 
                                            <li>Rp{item.sub_total}</li>
                                            )
                                             })}
                                        </ol>
                                    </td> */}
                                    <td className="text-left">Rp {item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Laporan;