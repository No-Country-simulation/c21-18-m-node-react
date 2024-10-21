import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import LogIn from "./pages/LogIn.jsx";
import PetDetail from "./pages/petDetail/PetDetail.jsx";
import { ShelterForm } from "./components/ShelterForm/ShelterForm.jsx";
import { PetForm } from "./components/PetForm/PetForm.jsx";
import { PetTable } from "./components/PetTable/PetTable.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* <Route path='/PetDetail' element={<PetDetail />} />  */}
        <Route path="/ShelterForm" element={<ShelterForm />} />
        <Route path="/PetForm" element={<PetForm />} />
        <Route path="/PetTable" element={<PetTable />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/api/pet/:id" element={<PetDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
