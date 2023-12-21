import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NivodaDiamondsProvider } from "./context/ApiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NivodaDiamondsProvider>
    <Router>
      <App />
    </Router>
  </NivodaDiamondsProvider>
);
