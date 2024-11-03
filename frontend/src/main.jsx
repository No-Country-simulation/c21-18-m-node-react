import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import LogIn from "./pages/LogIn.jsx";
import PetDetail from "./pages/petDetail/PetDetail.jsx";
import {
  PetForm,
  ShelterForm,
  PetTable,
  UserTable,
  ShelterTable,
  ApplicationTable,
} from "./components/index.js";
import { ProtectedRoute } from "./components/ProtectedRoute/index.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import AllPets from "./pages/AllPets/AllPets.jsx";
import ApplyForm from "./pages/ApplyForm/ApplyForm.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* <Route path='/PetDetail' element={<PetDetail />} />  */}
        {/* ========Protected Routes======== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/ShelterForm" element={<ShelterForm />} />
          <Route path="/ShelterForm/:id" element={<ShelterForm />} />
          <Route path="/PetForm" element={<PetForm />} />
          <Route path="/PetForm/:id" element={<PetForm />} />
          <Route path="/AplicationTable" element={<ApplicationTable />} />
          <Route path="/PetTable" element={<PetTable />} />
          <Route path="/UserTable" element={<UserTable />} />
          <Route path="/ShelterTable" element={<ShelterTable />} />
        </Route>
        {/* ========Protected Routes======== */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/api/pet/:id" element={<PetDetail />} />
        <Route path="/AllPets" element={<AllPets />} />
        <Route path="/ApplyForm/:id" element={<ApplyForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
