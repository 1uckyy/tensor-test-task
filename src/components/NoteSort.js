import React, { useContext } from "react";
import "./NoteSort.css";
import Context from "../context";

function NoteSort() {
  const { sortNotes } = useContext(Context);
  let [isSelect, setSelect] = React.useState("убыванию даты");

  return (
    <div className="note_sort">
      <div className="note_sort_label">Сортировать по</div>
      {isSelect ? (
        <div className="selected_sort_par" onClick={() => setSelect("")}>{isSelect}</div>
      ) : (
        <div className="select_sort_method">
          <div className="sort_par" onClick={() => {setSelect("убыванию даты"); sortNotes("убыванию даты");}}>убыванию даты</div>
          <div className="sort_par" onClick={() => {setSelect("возрастанию даты"); sortNotes("возрастанию даты");}}>
            возрастанию даты
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteSort;
