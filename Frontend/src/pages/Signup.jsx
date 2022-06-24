import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import img from "../assets/img/laundry.jpg"

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            nama_admin: "",
            username_admin: "",
            password_admin: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignup = (e) => {
        e.preventDefault()
        let data = {
            nama_admin: this.state.nama_admin,
            username_admin: this.state.username_admin,
            password_admin: this.state.password_admin
        }
        let url = "http://localhost:8080/admin"
        axios.post(url, data)
            .then(res => {
                window.alert("Success to Register")
                window.location = "/signin"
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className='w-full h-screen flex'>
                <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
                    <div className='w-full h-[550px] hidden md:block'>
                        <img className='w-full h-full' src={img} alt="/" />
                    </div>
                    <div className='p-4 flex flex-col justify-around'>
                        <form onSubmit={(e) => this.handleSignup(e)}>
                            <h2 className='text-4xl font-bold text-center mb-8'>Laundry App</h2>
                            <div>
                                <input className='border py-2 w-full' type="text" name="nama_admin" placeholder='Name' value={this.state.nama_admin} onChange={this.handleChange} />
                                <input className='border py-2 my-4 w-full' type="text" name="username_admin" placeholder='Username' value={this.state.username_admin} onChange={this.handleChange} />
                                <input className='border p-2 w-full' type="password" name="password_admin" value={this.state.password_admin} onChange={this.handleChange} placeholder='Password' />
                            </div>
                            <button type="submit" className='w-full py-2 my-4 bg-violet-700 hover:bg-violet-600 text-white font-bold'>Sign Up</button>
                            <h6 className='text-center'>Already have an account? <NavLink to="/signin" id="cr-account">Sign In</NavLink></h6>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}