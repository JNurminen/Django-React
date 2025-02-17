import Form from "../components/Form"

// Rekisteröitymissivu
function Register() {
    return <Form route="/api/user/register/" method="register" /> // Lomake, jossa käyttäjä voi rekisteröityä
}

export default Register