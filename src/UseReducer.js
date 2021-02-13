import "./styles.css";
import Setup from "./index";
import Modal from "./Modal";
import { data } from "./data";
import { useReducer, useState } from "react";
const reducer = (state, action) => {
  console.log(action.payload);
  if (action.type === "ADD") {
    return {
      ...state,
      people: [
        ...state.people,
        { id: action.payload.id, name: action.payload.name }
      ],
      isModalOpen: true,
      modalContent: "New Person Added"
    };
  } else {
    return {
      ...state,
      people: [],
      isModalOpen: true,
      modalContent: "Action Not defined"
    };
  }
  return state;
};
const initiaState = {
  people: [],
  isModalOpen: false,
  modalContent: ""
};
export default function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initiaState);
  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch({
        type: "ADD",
        payload: { id: new Date().getTime().toString(), name: name }
      });
      setName("");
    } else {
    }
  };

  return (
    <div className="App">
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <h1> Reducer </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">Add </button>
      </form>

      {state.people.map((person) => {
        return (
          <div key={person.id}>
            <h4>{person.name} </h4>
          </div>
        );
      })}
    </div>
  );
}
