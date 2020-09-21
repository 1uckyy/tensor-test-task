import React, { useContext } from "react";
import "./NoteContent.css";
import Context from "../context";

function NoteContent({ note }) {
  const { removeNote, editing, setEditing, editNote } = useContext(Context);

  return (
    <div className="note_content">
      {editing ? (
        <>
          <div className="btns_container">
            <button
              className="btn"
              onClick={() => {
                editNote(note.id, document.getElementById("editTitle").value, document.getElementById("textareaTitle").value);
                setEditing(false);
              }}
            >
              Сохранить
            </button>
            <button className="btn" onClick={() => setEditing(false)}>
              Отмена
            </button>
          </div>
          <input defaultValue={note.title} id="editTitle"></input>
          <textarea defaultValue={note.text} id="textareaTitle"></textarea>
        </>
      ) : (
        <>
          <div className="btns_container">
            {note ? (
              <>
                <button className="btn" onClick={() => setEditing(true)}>
                  Редактировать
                </button>
                <button className="btn" onClick={() => removeNote(note.id)}>
                  Удалить
                </button>
              </>
            ) : null}
          </div>
          <h1 className="note_title_content">{note ? note.title : ""}</h1>
          <div className="note_text">{note ? note.text : ""}</div>
        </>
      )}
    </div>
  );
}

export default NoteContent;
