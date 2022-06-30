import React from 'react';
import Navbar from '../components/Navbar'
import bgImg from "../assets/img/laundry1.jpg"

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            userName: "",
            adminId: 0,
            role: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('nama')
            this.state.role = localStorage.getItem("role")
        } else {
            window.location = '/signin'
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div name='home' className='relative bg-gray-50 flex flex-col justify-between'>
                        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                                <h3 className='py-3 text-5xl md:text-7xl font-bold'>Hi {this.state.userName}, Welcome to Purple Laundry</h3>
                                {this.state.role === "admin" && 
                                <p className='text-2xl'>You are login as admin now</p>
                                }
                                {this.state.role === "kasir" &&
                                <p className='text-2xl'>You are login as kasir now</p>
                                }
                                {this.state.role === "owner" &&
                                <p className="text-2xl">You are login as owner now</p>
                                }
                                <button className='py-3 px-6 sm:w-[60%] my-4 text-white border bg-violet-600 border-violet-600'>About</button>
                            </div>
                            <div>
                                <img className='w-full' src={bgImg} alt="/" />
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        );
    }
}

export default Dashboard;

