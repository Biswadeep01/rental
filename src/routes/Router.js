import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Fleet from '../pages/Fleet'
import PaymentMethod from '../components/UI/PaymentMethod'
import BookingForm from '../components/UI/BookingForm'
import Services from '../pages/Services'
import Blog from '../pages/Blog'
import Testimonials from '../pages/Testimonials'
import FAQ from '../pages/FAQ'
import Contact from '../pages/Contact'

const Router = () => {
  return <Routes>
    <Route path='/' element={<Navigate to='/home' />} />
    <Route path='/home' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/fleet' element={<Fleet />} />
    <Route path='/payment' element={<PaymentMethod />} />
    <Route path='/booking-form' element={<BookingForm />} />
    <Route path='/blog' element={<Blog />} />
    <Route path='/services' element={<Services />} />
    <Route path='/testimonials' element={<Testimonials />} />
    <Route path='/faq' element={<FAQ />} />
    <Route path='/contact' element={<Contact />} />
  </Routes>
}

export default Router