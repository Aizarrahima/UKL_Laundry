import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import img from "../assets/img/laundry.jpg"

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username_user: "",
            password_user: "",
            isModalOpen: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username_user: this.state.username_user,
            password_user: this.state.password_user
        }
        let url = "http://localhost:8080/user/login"
        axios.post(url, data)
            .then(res => {
                if (res.data.logged === true) {
                    let nama = res.data.data.nama_user
                    let role = res.data.data.role
                    let user = res.data.data
                    let token = res.data.token
                    let id = res.data.data.id_user
                    localStorage.setItem("nama", nama)
                    localStorage.setItem("id", id)
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    window.location = '/'
                } else {
                    window.alert(res.data.message)
                }
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
                        <form onSubmit={(e) => this.handleLogin(e)}>
                            <h2 className='text-4xl font-bold text-center mb-8'>Laundry App</h2>
                            <div>
                                <input className='border py-2 my-4 w-full' type="text" name="username_user" placeholder='Username' value={this.state.username_user} onChange={this.handleChange} required/>
                                <input className='border p-2 w-full' type="password" name="password_user" value={this.state.password_user} onChange={this.handleChange} placeholder='Password' required/>
                            </div>
                            <button type="submit" className='w-full py-2 my-4 bg-violet-700 hover:bg-violet-600 text-white font-bold'>Sign In</button>
                            <h6 className='text-center'><NavLink to="/forgotPassword" id="cr-account">Forgot Username or Password?</NavLink></h6>
                        </form>
                        {/* <h6 className='text-center'>Don't have an account? <NavLink to="/signup" id="cr-account">Sign Up</NavLink></h6> */}
                    </div>
                </div>
            </div>
        )
    }
}