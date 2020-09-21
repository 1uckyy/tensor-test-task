import React, {useEffect} from "react";
import "./App.css";
import ListNotes from "./components/ListNotes";
import NoteContent from "./components/NoteContent";
import AddNoteModal from "./components/AddNoteModal";
import NoteSort from "./components/NoteSort";
import Context from "./context";

function App() {
  const [notes, setNotes] = React.useState([]);
  let [editing, setEditing] = React.useState(false);

  useEffect(() => {
    getLocalNotes();
  }, []);
  useEffect(() => {
    saveLocalNotes();
  }, [notes]);

  function saveLocalNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function getLocalNotes() {
    if(localStorage.getItem("notes") === null) {
      localStorage.setItem("notes", JSON.stringify([]));
    } else {
      let noteLocal = JSON.parse(localStorage.getItem("notes"));
      setNotes(noteLocal);
    }
  }

  function setSelected(id) {
    setNotes(
      notes.map((note) => {
        if (id === note.id) note.selected = true;
        else note.selected = false;
        return note;
      })
    );
  }

  function removeNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function searchNote(title) {
    setNotes(
      notes.map((note) => {
        if (note.title.match(new RegExp(title))) note.finded = true;
        else note.finded = false;
        return note;
      })
    );
  }

  function editNote(id, title, text) {
    setNotes(
      notes.map((note) => {
        if (id === note.id) {
          note.title = title;
          note.text = text;
        }
        return note;
      })
    );
  }

  function addNote(title, text) {
    setNotes(
      notes.concat([
        {
          id: Date.now(),
          title: title,
          text: text,
          selected: false,
          finded: true,
        },
      ])
    );
  }

  function sortNotes(howSort) {
    switch (howSort) {
      case "убыванию даты":
        setNotes(
          [...notes].sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          })
        );
        break;
      case "возрастанию даты":
        setNotes(
          [...notes].sort(function (a, b) {
            if (a.id < b.id) {
              return 1;
            }
            if (a.id > b.id) {
              return -1;
            }
            return 0;
          })
        );
        break;
      default:
        console.log("unknown sort parameter");
    }
  }

  return (
    <Context.Provider
      value={{
        setSelected,
        removeNote,
        editing,
        setEditing,
        editNote,
        addNote,
        sortNotes,
      }}
    >
      <div className="notes_panel">
        <div className="note_choose">
          <AddNoteModal />
          <input
            className="note_search_field"
            placeholder="Поиск..."
            onChange={(event) => searchNote(event.target.value)}
          ></input>
          <NoteSort />
          <ListNotes notes={notes} />
        </div>
        <NoteContent note={notes.find((note) => note.selected === true)} />
      </div>
    </Context.Provider>
  );
}

export default App;
