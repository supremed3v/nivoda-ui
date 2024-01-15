import Modal from "react-modal";
import "./App.css";
import { Pages } from "./pages/pages";

function App() {
  return (
    <>
      <Pages />
    </>
  );
}

Modal.setAppElement("#root");

export default App;
