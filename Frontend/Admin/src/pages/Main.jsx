import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Outlet from './Outlet';
import Paket from './Paket';
import Member from './Member';
import Profile from './Profile';
import Cart from './Cart';
import User from './User';
import Transaksi from './Transaksi';
import DetailTransaksi from './DetailTransaksi';
import Invoice from './Invoice';
import Laporan from './Laporan';

const Main = () => {
    return (
        <Routes>
            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/outlet' element={<Outlet />} />
            <Route exact path='/paket' element={<Paket />} />
            <Route exact path='/user' element={<User />} />
            <Route exact path='/member' element={<Member />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/transaksi' element={<Transaksi />} />
            <Route exact path='/detail/:id_transaksi' element={<DetailTransaksi />} />
            <Route exact path='/invoice/:id_transaksi' element={<Invoice />} />
            <Route exact path='/laporan' element={<Laporan />} />
        </Routes>
    );
}

export default Main;