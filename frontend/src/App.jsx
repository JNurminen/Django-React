import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

// Logout funktio poistaa local storagesta kaikki tiedot ja ohjaa käyttäjän kirjautumissivulle
function Logout() {
  localStorage.clear() // Poistetaan local storagesta kaikki tiedot
  return <Navigate to="/login" /> // Ohjataan käyttäjä kirjautumissivulle
}

// Rekisteröitymisen jälkeen käyttäjä ohjataan kirjautumissivulle
function RegisterAndLogout() {
  localStorage.clear() // Poistetaan local storagesta kaikki tiedot
  return <Register /> // Ohjataan käyttäjä rekisteröitymissivulle
}

// Sovelluksen pääkomponentti
function App() {
  return (
    <BrowserRouter> // Reititys 
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute> // Suojattu reitti, joka ohjaa käyttäjän kirjautumissivulle, jos käyttäjä ei ole kirjautunut
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} /> // Kirjautumissivu
        <Route path="/logout" element={<Logout />} /> // Uloskirjautumissivu
        <Route path="/register" element={<RegisterAndLogout />} /> // Rekisteröitymissivu
        <Route path="*" element={<NotFound />}></Route> // 404-sivu
      </Routes>
    </BrowserRouter>
  )
}

export default App
