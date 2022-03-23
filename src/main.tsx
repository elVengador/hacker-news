import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import './main.css'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
)
