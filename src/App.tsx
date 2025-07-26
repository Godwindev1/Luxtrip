
import { useState } from 'react'
import './styles/App.css'
import { Landing_page } from './LandingPageComponents/Landing-page'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Landing_page/>
    </div>
  )
}

export default App
