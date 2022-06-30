import React from "react";
import axios from "axios";

class Laporan extends React.Component {
    constructor() {
        super();
        this.state = {
            laporan: [],
            member: [],
            detail: [],
            token: "",
            userName: "",
            id_detail_transaksi: 0,
            id_transaksi: 0,
            id_member: 0,
            id_user: 0,
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/signin"
        }

        this.state.id_user = localStorage.getItem("id")
    }

    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.data
                })
                console.log(this.state.transaksi)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getDetail = () => {
        let url = "http://localhost:8000/transaksi"
        axios.get(url)
            .then(res => {
                this.setState({
                    detail: res.data.data
                })
                console.log(this.state.detail)
            })
            .catch(error => {
                console.log(error)
            })
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

    componentDidMount() {
        this.getTransaksi();
        this.getDetail();
        this.getMember();
    }

    render() {
        return (
            <div>
                <table width="100%" className="mb-10">
                    <thead>
                        <tr className="bg-gray-100 p-1">
                            <td className="font-bold">Jenis Laundry</td>
                            <td className="font-bold">Quantity</td>
                            <td className="font-bold">Harga</td>
                            <td className="font-bold">Total</td>
                        </tr>
                    </thead>
                    {this.state.laporan.map((item, index) => (
                    <React.Fragment key={id_user}>
                        <tbody>
                            <tr className="h-10">
                                <td>{item.jenis}</td>
                                <td>{item.qty}</td>
                                <td>{item.harga}</td>
                                <td>{item.subtotal}</td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                    ))}
                </table>
                <div>
                    <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
                        Rp {item.total.toLocaleString()}
                    </h2>
                </div>
            </div>
        )
    }
}

export default Laporan;