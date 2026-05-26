import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('fsc_dark', 'true')
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes darkMode={true} setDarkMode={() => {}} />
    </BrowserRouter>
  )
}

export default App
