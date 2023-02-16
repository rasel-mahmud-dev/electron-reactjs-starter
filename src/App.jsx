import nodeLogo from "./assets/node.svg"
import { useEffect, useState } from 'react'
import './App.scss' 
import {Button, Spin, Space } from "antd"


console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  useEffect(()=>{
    let loaderRoot = document.querySelector(".app-loading-wrap")  
    if(loaderRoot){
      document.body.removeChild(loaderRoot)
    }
  }, [])
  


  return (
    <div className="App">
      
      <h1>Electron with ReactJS</h1>

      <Button>Antd Button</Button>
  
    </div>
  )
}

export default App
