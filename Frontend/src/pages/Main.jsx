import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Outlet from './Outlet';
import Paket from './Paket';
import Admin from './Admin';
import Kasir from './Kasir';
import Owner from './Owner';
import Member from './Member';
import Profile from './Profile';
import Cart from './Cart';
import User from './User';
import Checkout from './Checkout';
import Transaksi from './Transaksi';

const Main = () => {
    return (
        <Routes>
            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/outlet' element={<Outlet />} />
            <Route exact path='/paket' element={<Paket />} />
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path='/kasir' element={<Kasir />} />
            <Route exact path='/owner' element={<Owner />} />
            <Route exact path='/user' element={<User />} />
            <Route exact path='/member' element={<Member />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/checkout' element={<Checkout />} />
            <Route exact path='/transaksi' element={<Transaksi />} />
        </Routes>
    );
}

export default Main;