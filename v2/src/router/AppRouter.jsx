import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import NavBar from '../components/NavBar'
import PrivateRouter from './PrivateRoute'
import Login from '../pages/Login'
import Tesekkur from '../pages/Tesekkur'
import Sikayet from '../pages/Sikayet'
import OneriTalep from '../pages/OneriTalep'
import RamakKala from '../pages/RamakKala'




export const AppRouter = () => {


  return (

    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />

          <Route path='report' element={<PrivateRouter />}>
            <Route path='tesekkur' element={<Tesekkur />} />
            <Route path='sikayet' element={<Sikayet />} />
            <Route path='oneritalep' element={<OneriTalep />} />
            <Route path='ramakkala' element={<RamakKala />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
