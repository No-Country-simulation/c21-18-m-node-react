import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PetDetail from './pages/petDetail/PetDetail.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}>
    <Route index element={<Home />} /> 
    <Route path='/api/pet/:id' element={<PetDetail />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);
