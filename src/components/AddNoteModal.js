import React, { useContext } from "react";
import "./AddNoteModal.css";
import Context from "../context";

function AddNoteModal() {
  const { addNote } = useContext(Context);
  let [isOpen, setModal] = React.useState(false);

  return (
    <>
      <button className="btn btn_add_note" onClick={() => setModal(true)}>
        + Заметка
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-body">
            <h1>Новая заметка</h1>
            <input placeholder="Введите заголовок..." id="add_title"></input>
            <textarea
              placeholder="Введите содержание заметки..."
              id="add_text"
            ></textarea>
            <button
              className="btn btn_create"
              onClick={() => {
                let title_value = document.getElementById("add_title").value;
                let text_value = document.getElementById("add_text").value;
                if (title_value || text_value) addNote(title_value, text_value);
                setModal(false);
              }}
            >
              Создать
            </button>
            <button className="btn btn_close" onClick={() => setModal(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNoteModal;
