import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

// ProtectedRoute komponentti tarkistaa onko käyttäjä kirjautunut sisään ja ohjaa käyttäjän kirjautumissivulle, jos käyttäjä ei ole kirjautunut sisään.
function ProtectedRoute({ children }) { // ProtectedRoute komponentti saa propsina childrenin
    const [isAuthorized, setIsAuthorized] = useState(null); // isAuthorized tila määritellään nulliksi

    // useEffect hooki kutsuu auth funktiota, kun komponentti renderöidään ensimmäisen kerran
    useEffect(() => { 
        auth().catch(() => setIsAuthorized(false)) 
    }, [])

    // refreshToken funktio päivittää access tokenin, jos se on vanhentunut
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // refreshToken haetaan local storagesta
        try {
            const res = await api.post("/api/token/refresh/", { // tehdään POST pyyntö /api/token/refresh/ endpointtiin ja lähetetään refreshToken
                refresh: refreshToken,
            });
            if (res.status === 200) { // jos vastaus on 200, niin päivitetään access token ja asetetaan isAuthorized tila trueksi
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // access token asetetaan local storageen
                setIsAuthorized(true) 
            } else {
                setIsAuthorized(false) 
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };


    // auth funktio tarkistaa onko käyttäjä kirjautunut sisään
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token); // token dekoodataan
        const tokenExpiration = decoded.exp; // tokenin vanhentumisaika
        const now = Date.now() / 1000; // nykyinen aika 

        if (tokenExpiration < now) { // jos token on vanhentunut, niin kutsutaan refreshToken funktiota
            await refreshToken(); // refreshToken funktio kutsutaan
        } else {
            setIsAuthorized(true); // muuten käyttäjä on kirjautunut sisään
        }
    };

    if (isAuthorized === null) { // jos isAuthorized tila on null, niin palautetaan Loading...
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />; // jos käyttäjä on kirjautunut sisään, niin palautetaan children, muuten käyttäjä ohjataan kirjautumissivulle
}

export default ProtectedRoute;