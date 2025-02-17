import React from "react";
import "../styles/Note.css"

// Note komponentti joka renderöi yksittäisen muistiinpanon
function Note({ note, onDelete }) { 
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US") // Muotoillaan päivämäärä

    // Renderöidään muistiinpanon tiedot ja poistonappi
    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note;