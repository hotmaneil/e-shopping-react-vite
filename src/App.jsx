import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

const apiUrl=import.meta.env.VITE_REACT_APP_API_URL
console.log('apiUrl',apiUrl)

function App() {
  const [count, setCount] = useState(0)

  
  console.log('path',import.meta.env.VITE_REACT_APP_API_PATH)

  useEffect(()=>{
   (async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/v2/api/${import.meta.env.VITE_REACT_APP_API_PATH}/products/all`
      )

      console.log('response', response)
    })()
  },[])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
