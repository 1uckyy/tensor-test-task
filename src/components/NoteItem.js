import React, { useContext } from "react";
import "./NoteItem.css";
import Context from "../context";

function NoteItem({ note }) {
  const { setSelected, setEditing, removeNote } = useContext(Context);
  let [isShow, setShow] = React.useState(false);
  let selected = "note_item";

  if (note.selected) selected += " selected_note";

  return (
    <div className="rel" onMouseMove={() => setShow(true)} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div
        className={selected}
        onClick={() => {
          setSelected(note.id);
          setEditing(false);
        }}
      >
        <h3 className="note_title">{note.title}</h3>
        <div className="note_text">
          {note.text.length > 25 ? note.text.slice(0, 25) + "..." : note.text}
        </div>
      </div>
      {isShow && <button id="btn_delete_item" className="btn btn_close" onClick={() => removeNote(note.id)}>
        X
      </button>}
    </div>
  );
}

export default NoteItem;
