import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

// Form komponentti, joka ottaa propsinaan reitin ja metodin
function Form({ route, method }) {
    const [username, setUsername] = useState(""); // Käyttäjänimi
    const [password, setPassword] = useState(""); // Salasana
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); // Reittien ohjaus

    const name = method === "login" ? "Login" : "Register"; 

    const handleSubmit = async (e) => { // Lomakkeen lähetyksen käsittely
        setLoading(true);
        e.preventDefault();

        // Yritetään lähettää käyttäjänimi ja salasana backendille
        try {
            const res = await api.post(route, { username, password }) // Lähetetään käyttäjänimi ja salasana backendille
            if (method === "login") { // Jos metodi on login, tallennetaan käyttäjän tokenit local storageen ja ohjataan käyttäjä etusivulle
                localStorage.setItem(ACCESS_TOKEN, res.data.access); 
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh); 
                navigate("/") 
            } else { // Jos metodi on register, ohjataan käyttäjä kirjautumissivulle
                navigate("/login") 
            }
        } catch (error) { // Jos lähetyksessä tapahtuu virhe, näytetään virheilmoitus
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    // Lomake, jossa käyttäjä voi syöttää käyttäjänimensä ja salasanansa
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            {method === "login" && (
            <button
                className="form-button"
                type="button"
                onClick={() => navigate("/register")}
            >
                Register
            </button>
        )}
        </form>
    );
}

export default Form