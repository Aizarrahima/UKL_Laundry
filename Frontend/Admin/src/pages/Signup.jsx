import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import img from "../assets/img/laundry.jpg"

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            nama_user: "",
            username_user: "",
            password_user: "",
            role: "",
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
            nama_user: this.state.nama_user,
            username_user: this.state.username_user,
            password_user: this.state.password_user,
            role: this.state.role
        }
        let url = "http://localhost:8080/user"
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
                            <h2 className='text-4xl font-bold text-center mb-8'>Purple Laundry</h2>
                            <div>
                                <input className='border py-2 w-full' type="text" name="nama_user" placeholder='Name' value={this.state.nama_user} onChange={this.handleChange} />
                                <input className='border py-2 my-4 w-full' type="text" name="username_user" placeholder='Username' value={this.state.username_user} onChange={this.handleChange} />
                                <input className='border py-2 my-4 w-full' type="password" name="password_user" value={this.state.password_user} onChange={this.handleChange} placeholder='Password' />
                                <select className="form-select border p-2 w-full" name="role" value={this.state.role} onChange={this.handleChange} >
                                    <option selected>Open this role</option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </select>
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