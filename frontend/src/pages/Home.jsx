import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

// Home sivu joka näyttää kaikki muistiinpanot ja mahdollistaa uuden muistiinpanon luomisen ja vanhan poistamisen
function Home() {
    const [notes, setNotes] = useState([]); // Muistiinpanot
    const [content, setContent] = useState(""); // Muistiinpanon sisältö
    const [title, setTitle] = useState(""); // Muistiinpanon otsikko

    useEffect(() => {
        getNotes(); // Haetaan muistiinpanot kun sivu latautuu
    }, []);

    // Funktio joka hakee kaikki muistiinpanot
    const getNotes = () => {
        api
            .get("/api/notes/")  // Haetaan kaikki muistiinpanot
            .then((res) => res.data)  // Otetaan vastauksesta data
            .then((data) => {  // Asetetaan muistiinpanot
                setNotes(data); 
                console.log(data);
            })
            .catch((err) => alert(err));  // Jos tapahtui virhe
    };

    // Funktio joka poistaa muistiinpanon
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`) // Poistetaan muistiinpano id:n perusteella
            .then((res) => {
                if (res.status === 204) alert("Note deleted!"); // Jos poisto onnistui
                else alert("Failed to delete note."); // Jos poisto epäonnistui
                getNotes(); // Haetaan muistiinpanot uudelleen
            })
            .catch((error) => alert(error)); // Jos tapahtui virhe
    };

    // Funktio joka luo uuden muistiinpanon
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title }) // Luodaan uusi muistiinpano
            .then((res) => {
                if (res.status === 201) alert("Note created!"); // Jos luonti onnistui
                else alert("Failed to make note."); // Jos luonti epäonnistui
                getNotes(); // Haetaan muistiinpanot uudelleen
            })
            .catch((err) => alert(err)); // Jos tapahtui virhe
    };

    // Renderöidään sivu ja muistiinpanot
    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} /> // Renderöidään jokainen muistiinpano
                ))}
            </div>
            <h2>Create a Note</h2> // Lomake uuden muistiinpanon luomiseen
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>  // Otsikon syöttökenttä
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>  // Sisällön syöttökenttä
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;