import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllPets from './pages/AllPets';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline'; // Importa CssBaseline


function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllPets" element={<AllPets />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
