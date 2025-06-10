import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './home-components/HomePage'

function App() {
  return (
    <Router>
      <div className='m-0 p-0'>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<HomePage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
