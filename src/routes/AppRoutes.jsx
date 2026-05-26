import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import AllFontsPage from '../pages/AllFontsPage'
import FavoritesPage from '../pages/FavoritesPage'
import AboutPage from '../pages/AboutPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/fonts" element={<AllFontsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}
