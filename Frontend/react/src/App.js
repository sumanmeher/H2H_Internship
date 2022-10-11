import React from 'react'
import './App.css'
import 'reactjs-popup/dist/index.css'
import Navbar from './components/Navbar/Navbar'
import Table from './components/Table/Table'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Table />
      <Footer />
    </div>
  )
}

export default App
