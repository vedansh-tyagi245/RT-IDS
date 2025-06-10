import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './home-components/Welcome'
import UploadFile from './File-Upload-components/UploadFile' // Assuming you have an UploadFile component

function App() {
  return (
    <Router>
      <div className='m-0 p-0'>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Welcome />} />

          {/* Route for /Uploadfile */}
          <Route path="/Uploadfile" element={<UploadFile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
