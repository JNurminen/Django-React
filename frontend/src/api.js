import axios from "axios"; 
import { ACCESS_TOKEN } from "./constants"; 

// Määritellään API:n perusosoite
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, // VITE_API_URL on globaali muuttuja, joka on määritelty .env-tiedostossa
});


// Lisätään Authorization-headeriin token, jos sellainen on olemassa
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN); // ACCESS_TOKEN on määritelty constants.js-tiedostossa localStorageen tallennettavalle tokenille
      if (token) { // Jos token on olemassa, lisätään se Authorization-headeriin
        config.headers.Authorization = `Bearer ${token}`; // Bearer on autentikointiprotokolla, jota käytetään yhdessä JWT-tokenin kanssa
      }
      return config; // Palautetaan muokattu config
    },
    (error) => { 
        return Promise.reject(error); // Jos tulee virhe, palautetaan virhe
    }
);

export default api; // Viedään API ulos moduulista käytettäväksi muualla