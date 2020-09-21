import React from "react";
import NoteItem from "./NoteItem";

function ListNotes(props) {
  return (
    <div className="list_notes">
      {props.notes.length !== 0
        ? props.notes.map((note) =>
            note.finded ? <NoteItem note={note} key={note.id} /> : null
          )
        : "Нет заметок"}
    </div>
  );
}

export default ListNotes;
