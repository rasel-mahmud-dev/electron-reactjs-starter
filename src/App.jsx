import nodeLogo from "./assets/node.svg"
import { useState } from 'react'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  

  return (
    <div className="App">
      <img src={nodeLogo} alt="" />
      <h1>Electron with ReactJS</h1>
    
    </div>
  )
}

export default App
