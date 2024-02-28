import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Fleet from '../pages/Fleet'
import FleetDetails from '../pages/FleetDetails'
import Services from '../pages/Services'
import Blog from '../pages/Blog'
import BlogDetails from '../pages/BlogDetails'
import Testimonials from '../pages/Testimonials'
import TestimonialsDetail from '../pages/TestimonialsDetail'
import FAQ from '../pages/FAQ'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

const Router = () => {
  return <Routes>
    <Route path='/' element={<Navigate to='/home' />} />
    <Route path='/home' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/fleet' element={<Fleet />} />
    <Route path='/fleet/:slug' element={<FleetDetails />} />
    <Route path='/blog' element={<Blog />} />
    <Route path='/blog/:slug' element={<BlogDetails />} />
    <Route path='/services' element={<Services />} />
    <Route path='/testimonials' element={<Testimonials />} />
    <Route path='/testimonials/:slug' element={<TestimonialsDetail />} />
    <Route path='/faq' element={<FAQ />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/' element={<NotFound />} />
  </Routes>
}

export default Router