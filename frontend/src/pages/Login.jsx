import Form from "../components/Form"

// Kirjautumissivu
function Login() {
    return <Form route="/api/token/" method="login" /> // Lomake, jossa käyttäjä voi kirjautua
}

export default Login