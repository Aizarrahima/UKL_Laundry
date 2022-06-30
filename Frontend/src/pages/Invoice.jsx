import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Invoice extends React.Component {
    constructor() {
        super();
        this.state = {
            transaksi: [],
            member: [],
            outlet: [],
            isModalOpen: false,
            token: "",
            adminName: "",
            id_transaksi: 0,
            id_member: 0,
            id_user: 0,
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            total: "",
            nama_member: "",
            nama_user: "",
            // search: "",
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
        }

        this.state.id_transaksi = this.props.params.id_transaksi
    }


}