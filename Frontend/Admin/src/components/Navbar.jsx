import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import icon from '../assets/img/washing-machine.png';

export default class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            role: ""
        }

        this.state.role = localStorage.getItem("role")
    }

    out = () => {
        if (window.confirm("Are you sure to logout?")) {
            window.location = '/signin'
            localStorage.clear()
        }
    }

    render() {
        return (
            <div>
                <nav className="bg-gray-50 drop-shadow-md md:drop-shadow-xl">
                    <div className="max-w-7xl mx-5 px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mr-10">
                                <div className="flex-shrink-0 flex items-center mr-2">
                                    <NavLink to="/" className="hidden lg:block h-10 ml-3 w-10 mr-0 ">
                                        <img src={icon} alt="icon" />
                                    </NavLink>
                                </div>
                                {this.state.role === "admin" &&
                                    <div className="hidden sm:block sm:ml-1 mx-10">
                                        <div className="menu flex space-x-2 ml-10">
                                            <NavLink to="/" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Dashboard</NavLink>
                                            <NavLink to="/outlet" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Outlet</NavLink>
                                            <NavLink to="/paket" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Paket</NavLink>
                                            <NavLink to="/user" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">User</NavLink>
                                            <NavLink to="/member" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Member</NavLink>
                                            <NavLink to="/transaksi" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Transaksi</NavLink>
                                            <NavLink to="/laporan" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Laporan</NavLink>
                                            <NavLink to="/cart" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="cart"><i className="fa fa-shopping-cart me-1 "></i></NavLink>
                                            <NavLink to="/profile" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="profile"><i className="fa fa-user me-1 "></i></NavLink>
                                            <button onClick={() => this.out()} className="no-underline text-gray-800 px-3 py-2 hover:text-purple-800 rounded-md text-2xl font-medium" aria-current="page" ><i className="fa fa-sign-out me-1 "></i></button>
                                        </div>
                                    </div>
                                }
                                {this.state.role === "kasir" &&
                                    <div className="hidden sm:block sm:ml-1 mx-10">
                                        <div className="menu flex space-x-2 ml-10 ">
                                            <NavLink to="/" className="no-underline ml-20 text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Dashboard</NavLink>
                                            <NavLink to="/member" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Member</NavLink>
                                            <NavLink to="/paket" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Paket</NavLink>
                                            <NavLink to="/transaksi" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Transaksi</NavLink>
                                            <NavLink to="/laporan" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Laporan</NavLink>
                                            <NavLink to="/cart" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="cart"><i className="fa fa-shopping-cart me-1 "></i></NavLink>
                                            <NavLink to="/profile" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="profile"><i className="fa fa-user me-1 "></i></NavLink>
                                            <button onClick={() => this.out()} className="no-underline text-gray-800 px-3 py-2 hover:text-purple-800 rounded-md text-2xl font-medium" aria-current="page" ><i className="fa fa-sign-out me-1 "></i></button>
                                        </div>
                                    </div>
                                }
                                {this.state.role === "owner" &&
                                    <div className="hidden sm:block sm:ml-1 mx-10">
                                        <div className="menu-owner flex space-x-2 ml-10 ">
                                            <NavLink to="/" className="no-underline ml-20 text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Dashboard</NavLink>
                                            <NavLink to="/laporan" className="no-underline text-gray-800 hover:bg-purple-800 hover:text-white px-3 py-3 rounded-md text-sm font-medium " aria-current="page">Laporan</NavLink>
                                            <NavLink to="/cart" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="cart-owner"><i className="fa fa-shopping-cart me-1 "></i></NavLink>
                                            <NavLink to="/profile" className="no-underline text-gray-800 hover:text-purple-800 px-3 py-2 rounded-md text-2xl font-medium" aria-current="page" id="profile"><i className="fa fa-user me-1 "></i></NavLink>
                                            <button onClick={() => this.out()} className="no-underline text-gray-800 px-3 py-2 hover:text-purple-800 rounded-md text-2xl font-medium" aria-current="page" ><i className="fa fa-sign-out me-1 "></i></button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
                <div>
                </div>
            </div>
        )
    }
}
